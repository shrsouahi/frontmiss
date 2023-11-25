import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { CommandeService } from 'src/app/services/commande.service';
import { UserService } from 'src/app/services/user.service';
import QuantityOrder from 'src/app/models/QuantityOrder.model';
import { Category } from 'src/app/models/Category.model';
import Commande from 'src/app/models/Commande.model';
import { QuantityOrderService } from 'src/app/services/quantity-order.service';
import { forkJoin, Observable } from 'rxjs';
import { Article } from 'src/app/models/Article.model';

@Component({
  selector: 'app-accauildashboard',
  templateUrl: './accauildashboard.component.html',
  styleUrls: ['./accauildashboard.component.css'],
})
export class AccauildashboardComponent implements OnInit {
  lowStockDataSource: Article[] = [];
  lowStockDisplayedColumns: string[] = ['articleName', 'currentQuantity'];
  totalItems: number = 0;
  selectedPageSize: number = 5;

  onPageChange(event: any): void {
    console.log('Page event:', event);
    // You might want to fetch the data for the new page here
    // e.g., this.loadLowStockData(event.pageIndex, event.pageSize);
  }

  chartData: any = {
    data: [],
    labels: [],
    options: {},
    type: 'pie',
  };

  statusChartData: any = {
    data: [],
    labels: [],
    options: {},
    type: 'doughnut',
  };

  topArticlesChartData: any = {
    data: [],
    labels: [],
    options: {},
    type: 'polarArea',
  };

  topOrderedArticles!: any[];

  totalOrdersChartData: any;

  public pieChartLegend = true;
  constructor(
    private articleService: ArticleService,
    private commandeService: CommandeService,
    private userService: UserService,
    private quantityOrderService: QuantityOrderService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    forkJoin({
      users: this.userService.getUsersByRole('Client'),
      articles: this.articleService.getAllArticles(),
      orders: this.commandeService.getAllOrders(),
    }).subscribe(({ users, articles, orders }) => {
      this.cards[0].content = users.length.toString();
      this.cards[1].content = articles.length.toString();
      this.cards[2].content = orders.length.toString();
      // Filter articles with quantity <= 5
      this.lowStockDataSource = articles.filter(
        (article: Article) => article.quantiteStock <= 5
      );

      const commandesByStatus = this.calculateCommandesByStatus(orders);
      this.statusChartData = {
        labels: commandesByStatus.map((entry) => entry.status),
        datasets: [
          {
            data: commandesByStatus.map((entry) => entry.count),
            backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(255, 205, 86, 0.8)',
              'rgba(54, 162, 235, 0.8)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.8)',
            ],
            legend: true,
          },
        ],
        type: 'doughnut',
      };

      const quantityOrdersObservables: Observable<QuantityOrder[]>[] =
        orders.map((order: Commande) =>
          this.quantityOrderService.getQuantityOrdersByCommandeId(
            order.idCommande
          )
        );

      forkJoin(quantityOrdersObservables).subscribe(
        (quantityOrdersArray: QuantityOrder[][]) => {
          const quantityOrders = quantityOrdersArray.reduce(
            (acc, curr) => acc.concat(curr),
            []
          );

          const commandesByCategories =
            this.calculateCommandesByCategories(quantityOrders);

          this.chartData = {
            labels: commandesByCategories.map((entry) => entry.category),
            datasets: [
              {
                data: commandesByCategories.map((entry) => entry.count),
              },
            ],
            type: 'pie',
          };

          this.loadTopOrderedArticles(quantityOrders);
        }
      );

      this.cards[3].content =
        this.commandeService.getTotalRevenue(orders) + ' TND'.toString();

      // Filter orders for the last 6 months
      const lastSixMonthsOrders = this.filterOrdersForLastSixMonths(orders);

      // Add a new bar chart for total orders by month
      this.totalOrdersChartData =
        this.calculateTotalOrdersByMonthChart(lastSixMonthsOrders);
    });
  }

  calculateCommandesByCategories(orders: QuantityOrder[]): any[] {
    const commandesByCategories: { [key: string]: number } = {};

    orders.forEach((quantityOrder) => {
      if (quantityOrder.article && quantityOrder.article.categories) {
        const categories = quantityOrder.article.categories;

        categories.forEach((category: Category) => {
          const categoryName = category.nomCategory;

          if (commandesByCategories[categoryName]) {
            commandesByCategories[categoryName]++;
          } else {
            commandesByCategories[categoryName] = 1;
          }
        });
      }
    });

    const resultArray = Object.keys(commandesByCategories).map((category) => ({
      category,
      count: commandesByCategories[category],
    }));

    return resultArray;
  }

  calculateCommandesByStatus(orders: any[]): any[] {
    const commandesByStatus: { [key: string]: number } = {};

    orders.forEach((order) => {
      const status = order.status;

      if (commandesByStatus[status]) {
        commandesByStatus[status]++;
      } else {
        commandesByStatus[status] = 1;
      }
    });

    const resultArray = Object.keys(commandesByStatus).map((status) => ({
      status,
      count: commandesByStatus[status],
    }));

    return resultArray;
  }

  loadTopOrderedArticles(allQuantityOrders: QuantityOrder[]): void {
    console.log('All Quantity Orders:', allQuantityOrders);

    const articleQuantitiesMap: { [key: string]: number } = {};

    allQuantityOrders.forEach((quantityOrder) => {
      const articleName = quantityOrder.article.nomArticle;
      const quantity = quantityOrder.quantity;
      console.log(`Article: ${articleName}, Quantity: ${quantity}`);

      if (articleName) {
        if (articleQuantitiesMap[articleName]) {
          // Increment the quantity for the existing article
          articleQuantitiesMap[articleName] += quantity;
        } else {
          // Initialize the quantity for the new article
          articleQuantitiesMap[articleName] = quantity;
        }
      }
    });

    const topOrderedArticles = Object.keys(articleQuantitiesMap).map(
      (articleName) => ({
        articleName,
        quantity: articleQuantitiesMap[articleName] as number,
      })
    );

    this.topOrderedArticles = topOrderedArticles
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    this.topArticlesChartData = {
      labels: this.topOrderedArticles.map((entry) => entry.articleName),
      datasets: [
        {
          data: this.topOrderedArticles.map((entry) => entry.quantity),
        },
      ],
      type: 'polarArea',
    };

    console.log('Final Top Ordered Articles:', this.topOrderedArticles);
  }

  filterOrdersForLastSixMonths(orders: any[]): any[] {
    const today = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(today.getMonth() - 5); // subtracting 5 as months are zero-indexed

    return orders.filter((order) => {
      const orderDate = new Date(order.orderDate);
      return orderDate >= sixMonthsAgo;
    });
  }

  calculateTotalOrdersByMonthChart(orders: any[]): any {
    const totalOrdersByMonth: { [key: string]: number } = {};

    orders.forEach((order) => {
      const orderDate = new Date(order.orderDate);
      const monthYearKey = `${
        orderDate.getMonth() + 1
      }-${orderDate.getFullYear()}`;

      if (totalOrdersByMonth[monthYearKey]) {
        totalOrdersByMonth[monthYearKey]++;
      } else {
        totalOrdersByMonth[monthYearKey] = 1;
      }
    });

    const months = Object.keys(totalOrdersByMonth);
    const orderCounts = Object.values(totalOrdersByMonth);

    return {
      labels: months,
      datasets: [
        {
          label: 'Nombre de commandes',
          data: orderCounts,
          backgroundColor: 'rgba(75, 192, 192, 0.8)',
          borderWidth: 1,
        },
      ],
      type: 'bar',
    };
  }

  topArticlesChartLabels: string[] = [];

  cards = [
    { title: 'Clients', content: '', iconPath: 'assets/images/women.png' },
    {
      title: 'Articles',
      content: '',
      iconPath: 'assets/images/clothes-hanger.png',
    },
    {
      title: 'Commandes effectuées',
      content: '',
      iconPath: 'assets/images/box.png',
    },
    {
      title: 'Total Revenus',
      content: '',
      iconPath: 'assets/images/wallet.png',
    },
  ];
}
