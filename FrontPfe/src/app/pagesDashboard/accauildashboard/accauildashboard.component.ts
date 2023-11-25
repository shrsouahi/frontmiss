import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { CommandeService } from 'src/app/services/commande.service';
import { UserService } from 'src/app/services/user.service';
import QuantityOrder from 'src/app/models/QuantityOrder.model';
import { Category } from 'src/app/models/Category.model';
import Commande from 'src/app/models/Commande.model';
import { QuantityOrderService } from 'src/app/services/quantity-order.service';
import { forkJoin, Observable } from 'rxjs'; // Import forkJoin and Observable

@Component({
  selector: 'app-accauildashboard',
  templateUrl: './accauildashboard.component.html',
  styleUrls: ['./accauildashboard.component.css'],
})
export class AccauildashboardComponent implements OnInit {
  chartData: any = {
    data: [],
    labels: [],
    options: {},
    type: 'doughnut',
  };
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
    this.userService.getUsersByRole('Client').subscribe((users) => {
      this.cards[0].content = users.length.toString(); // Number of Clients
    });

    this.articleService.getAllArticles().subscribe((articles) => {
      this.cards[1].content = articles.length.toString(); // Number of Articles
    });

    this.commandeService.getAllOrders().subscribe((orders) => {
      console.log('Orders:', orders);
      this.cards[2].content = orders.length.toString(); // Number of Commandes

      // Fetch all QuantityOrders for each order using forkJoin
      const quantityOrdersObservables: Observable<QuantityOrder[]>[] =
        orders.map((order: Commande) =>
          this.quantityOrderService.getQuantityOrdersByCommandeId(
            order.idCommande
          )
        );

      forkJoin(quantityOrdersObservables).subscribe(
        (quantityOrdersArray: QuantityOrder[][]) => {
          // Flatten the array of arrays into a single array
          const quantityOrders = quantityOrdersArray.reduce(
            (acc, curr) => acc.concat(curr),
            []
          );

          // Pass quantityOrders to calculateCommandesByCategories
          const commandesByCategories =
            this.calculateCommandesByCategories(quantityOrders);

          this.chartData = {
            labels: commandesByCategories.map((entry) => entry.category),
            datasets: [
              {
                data: commandesByCategories.map((entry) => entry.count),
              },
            ],
            options: {
              title: {
                display: true,
                text: 'Total Ventes par catégorie',
                fontSize: 16,
              },
            },
            type: 'doughnut',
          };

          console.log('Chart Data:', this.chartData);
          console.log('labels', this.chartData.labels);
        }
      );
    });

    this.commandeService.getAllOrders().subscribe((orders) => {
      this.cards[3].content =
        this.commandeService.getTotalRevenue(orders) + ' TND'.toString();
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

  cards = [
    { title: 'Clientes', content: '', icon: 'people' },
    { title: 'Articles', content: '', icon: 'library_books' },
    { title: 'Commandes effectuées', content: '', icon: 'shopping_cart' },
    { title: 'Total Revenus', content: '', icon: 'attach_money' },
  ];
}
