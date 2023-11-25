import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataSets } from 'chart.js';
import { JournalServiceService } from '../journal-service.service';
import { ServeurServiceService } from '../serveur-service.service';
import { Serveur } from '../serveur';
import { NEVER, endWith, startWith } from 'rxjs';
import { start } from 'repl';
import { LogServiceService } from '../log-service.service';
import { Logs_file } from '../Logs_file';
import { SiServiceService } from '../si-service.service';
import { Si } from '../si';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(private ser:JournalServiceService,private service:ServeurServiceService,private s:LogServiceService,private se:SiServiceService) { }
  serveurs!:Serveur[]
  listeServ:any=[]
  min:any[]=[]
  moy:any[]=[]
  maj:any[]=[]
  war:any[]=[]
  title = 'chartDemo';

  flog!:Logs_file[]
  logs:any=[]
  logmin:any[]=[]
  logwar:any[]=[]
  logmoy:any[]=[]
  logmaj:any[]=[]

  siArray!:Si[]
  siA:any=[]
  siWar:any[]=[]
  siMin:any[]=[]
  siMoy:any[]=[]
  siMaj:any[]=[]
  ngOnInit()
  {
    //Récupération des données des alarmes selon les serveurs de la base 
    var i!:number
    this.service.getAllServeur().subscribe(data=>{this.serveurs=<Serveur[]>data
      console.log(this.serveurs)
      console.log(typeof(this.serveurs))
      for(i=0;i<this.serveurs.length;i++){
        //console.log(this.serveurs[i]['idServeur'])
        this.listeServ[i]=this.serveurs[i]['nomHost']
      }
    for(i=0;i<this.serveurs.length;i++){
      this.listeServ[i]=this.serveurs[i]['nomHost']
      
      this.ser.getAlarmeWarBySer(this.serveurs[i]['idServeur']).subscribe(data=>{
        console.log(typeof(data))
        this.war.push(Number(data))
        console.log(this.war)
        
      })
      this.ser.getAlarmeMinBySer(this.serveurs[i]['idServeur']).subscribe(data=>{
        //console.log(data)
        this.min.push(Number(data))
      })

      this.ser.getAlarmeMoyBySer(this.serveurs[i]['idServeur']).subscribe(data=>{
       // console.log(data)
        this.moy.push(Number(data))
      })

      this.ser.getAlarmeMajBySer(this.serveurs[i]['idServeur']).subscribe(data=>{
        //console.log(data)
        this.maj.push(Number(data))
      })
      // Chart selon les serveurs
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
          labels: this.listeServ,
          datasets: [{
              label: 'warning',
              data: this.war,
              backgroundColor:"#0196FD",
              borderColor: "#0196FD",
              borderWidth: 1
          },
          {
            label: 'Majeurs',
            data:this.maj,
            backgroundColor:"#FFAF00",
            borderColor: "dark",
            borderWidth: 1
        },
        {
          label: 'Moyennes',
          data:this.moy,
          backgroundColor:"dark",
          borderColor: "dark",
          borderWidth: 1
      },
      {
        label: 'Mineurs',
        data:this.min,
        backgroundColor:"green",
        borderColor: "dark",
        borderWidth: 1
    }
      ]
      },
      options: {
          scales: {

          }
      }
  });

    }
  })


  // cette partie pour l'affichage de nombre des alarmes par fichier logs 
  this.s.getFileLogs().subscribe(data=>{this.flog=<Logs_file[]>data
    console.log(this.flog)

    for(i=0;i<this.flog.length;i++){
      this.logs[i]=this.flog[i]['lastFile']
      
      this.ser.getAlarmeWarByLog(Number(this.flog[i]['idlogs'])).subscribe(data=>{
        this.logwar.push(data)
        console.log(this.logwar)
      })

      this.ser.getAlarmeMoyByLog(Number(this.flog[i]['idlogs'])).subscribe(data=>{
        this.logmoy.push(data)
        console.log(this.logmoy)
      })

      this.ser.getAlarmeMinByLog(Number(this.flog[i]['idlogs'])).subscribe(data=>{
        this.logmin.push(data)
        console.log(this.logmin)
      })

      this.ser.getAlarmeMajBySer(Number(this.flog[i]['idlogs'])).subscribe(data=>{
        this.logmaj.push(data)
        console.log(this.logmaj)
      })
    }
    console.log(this.logs)


  })
  // Chart des alarmes par fichier logs
  var myChart = new Chart("myChar", {
    type: 'bar',
    data: {
        labels: this.logs,
        datasets: [{
            label: 'warning',
            data: this.logwar,
            backgroundColor:"#0196FD",
            borderColor: "#0196FD",
            borderWidth: 1
        },
        {
          label: 'Majeurs',
          data:this.logmaj,
          backgroundColor:"#FFAF00",
          borderColor: "dark",
          borderWidth: 1
      },
      {
        label: 'Moyennes',
        data:this.logmoy,
        backgroundColor:"dark",
        borderColor: "dark",
        borderWidth: 1
    },
    {
      label: 'Mineurs',
      data:this.logmin,
      backgroundColor:"green",
      borderColor: "dark",
      borderWidth: 1
  }
    ]
    },
    options: {
        scales: {

        }
    }


})
// reupération des alarmes par Si
this.se.getAllSi().subscribe(data=>{
  this.siArray=<Si[]>data
  console.log(this.siArray)

  for(i=0;i<this.siArray.length;i++){
    this.siA[i]=this.siArray[i]['nom_Si']

    this.ser.getAlarmeWarBySi(Number(this.siArray[i]['idSI'])).subscribe(data=>{
      this.siWar.push(data)
      console.log("this is Si"+ this.siWar)
    })

    this.ser.getAlarmeMinBySi(Number(this.siArray[i]['idSI'])).subscribe(data=>{
      this.siMin.push(data)
      console.log("this is Si"+ this.siMin)
    })

    this.ser.getAlarmeMoyBySi(Number(this.siArray[i]['idSI'])).subscribe(data=>{
      this.siMoy.push(data)
      console.log("this is Si"+ this.siMoy)
    })

    this.ser.getAlarmeMajBySi(Number(this.siArray[i]['idSI'])).subscribe(data=>{
      this.siMaj.push(data)
      console.log("this is Si"+ this.siMaj)
    })
  }
  console.log(this.siA)
})
// Chart des alarmes pae Si
var myChart = new Chart("myCha", {
  type: 'bar',
  data: {
      labels: this.siA,
      datasets: [{
          label: 'warning',
          data: this.siWar,
          backgroundColor:"#0196FD",
          borderColor: "#0196FD",
          borderWidth: 1
      },
      {
        label: 'Majeurs',
        data:this.siMaj,
        backgroundColor:"#FFAF00",
        borderColor: "dark",
        borderWidth: 1
    },
    {
      label: 'Moyennes',
      data:this.siMoy,
      backgroundColor:"dark",
      borderColor: "dark",
      borderWidth: 1
  },
  {
    label: 'Mineurs',
    data:this.siMin,
    backgroundColor:"green",
    borderColor: "dark",
    borderWidth: 1
}
  ]
  },
  options: {
      scales: {

      }
  }


})

  }

  // Fonction d'imprime des Charts en PDF 
  imprime(){
    window.print()
  }
}
