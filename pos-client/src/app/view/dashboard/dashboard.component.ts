import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {CustomerService} from "../../core/service/customer/customer.service";
import {ProductService} from "../../core/service/product/product.service";
import {OrderService} from "../../core/service/order/order.service";
import { Chart,BarController, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import {CookieService} from "../../core/service/cookie/cookie.service";
import {RouterLink} from "@angular/router";
import {interval, Subscription} from "rxjs";
import {OrderDTO} from "../../core/dto/OrderDTO";
import {ItemService} from "../../core/service/item/item.service";
import {TopProductDTO} from "../../core/dto/TopProductDTO";
// import { BarController } from 'chart.js';

@Component({
    selector: 'app-dashboard',
  imports: [
    NgClass,
    NgStyle,
    NgForOf,
    NgIf,
    RouterLink,
    DatePipe,
    CurrencyPipe,
  ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{


  salesChart: any;
  currentTime = new Date();
  greeting:string = '';
  totalSales = 0;
  customerCount = 0;
  orderCount = 0;
  productCount = 0;
  recentOrders:any[] = [];
  topProducts:TopProductDTO[] = [];
  monthlySales:any = {};

  timeFilters = ['Day', 'Week', 'Month', 'Year'];
  selectedTimeFilter = 'Week';


  stats:any[] = [];
  user:any;
  private subscription!: Subscription;

  constructor(
    private customerService:CustomerService,
    private productService:ProductService,
    private orderService: OrderService,
    private cookieService:CookieService,
    private itemService:ItemService,
  ) {
  }


  ngOnInit(): void {

    this.user = this.cookieService.getCookie('token').valueOf()

    this.loadGreeting();
    this.loadRecentOrders();
    this.loadTopProducts();
    this.loadCustomers();
    this.loadProduct();
    this.loadOrders();
    this.findTotalSales();
    this.loadMonthlySales();

    Chart.register(BarController, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    this.refreshDateTime();
  }

  updateStats(): void {
    this.stats = [
      { title: 'Total Sales', value: this.totalSales, change: '+12.5%', increase: true },
      { title: 'New Customers', value: this.customerCount, change: '+8.2%', increase: true },
      { title: 'Total Orders', value: this.orderCount, change: '+5.3%', increase: true },
      { title: 'Active Products', value: this.productCount, change: '-2.1%', increase: false }
    ];
  }

  loadGreeting() {
    if(this.currentTime.getHours() >= 12) this.greeting = 'Good evening'
    else this.greeting = 'Good morning';
  }

  loadProduct(){
    this.productService.search('',0,1).subscribe({
      next: response => {
        this.productCount = response.data.count;
        this.updateStats();
      },
      error: error => {console.log(error);},
      complete:()=>console.log('Complete'),
    })
  }

  loadOrders(){
    this.orderService.search('',0,1).subscribe({
      next: response => {
        this.orderCount = response.data.count;
        this.updateStats();
      },
      error: error => {console.log(error);},
      complete:()=>console.log('Complete'),
    })
  }


  loadCustomers(){
    this.customerService.search('',0,1).subscribe({
      next: response => {
        this.customerCount = response.data.count;
        this.updateStats();
      },
      error: error => {console.log(error);},
      complete:()=>console.log('Complete'),
    })
  }

  findTotalSales(){

    this.orderService.findTotalSales().subscribe({next: response => {
        this.totalSales = response.data;
        this.updateStats()
      }})
  }

  loadRecentOrders() {
    this.orderService.findTop5Orders().subscribe({
      next:response => {
        this.recentOrders = response.data;
      },
      error: error => {console.log(error);},
      complete:()=>console.log('Complete')
    })
  }

  loadTopProducts() {
    this.itemService.findTopProductItems().subscribe({
      next:response => {
        this.topProducts = response.data;
      },
      error: error => {console.log(error);},
      complete:()=>console.log('Complete')
    })
  }

  loadMonthlySales(){
    this.orderService.findMonthlySales().subscribe({
      next:response => {
        console.log(response)
        this.monthlySales = response.data;
        this.initSalesChart();
      },
      error: error => {console.log(error);},
      complete:()=>console.log('Complete')
    })
  }

  refreshDateTime(){
    this.subscription = interval(60 * 1000).subscribe(() => {
      this.currentTime = new Date(); // Update time object every minute
    });
  }



  // initSalesChart(): void {
  //
  //   if (typeof document === 'undefined') {
  //     return; // Prevents execution on the server
  //   }
  //
  //   const canvas = document.getElementById('salesChart') as HTMLCanvasElement;
  //   if (canvas) {
  //     const ctx = canvas.getContext('2d');
  //
  //     if (ctx) {
  //       this.salesChart = new Chart(ctx, {
  //         type: 'line',
  //         data: {
  //           labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //           datasets: [
  //             {
  //               label: 'Revenue',
  //               data: [3200, 4100, 3800, 5200, 4800, 6300, 6100],
  //               backgroundColor: 'rgba(59, 130, 246, 0.1)',
  //               borderColor: 'rgba(59, 130, 246, 0.8)',
  //               borderWidth: 2,
  //               fill: true,
  //               tension: 0.4,
  //               pointRadius: 4,
  //               pointBackgroundColor: '#fff',
  //               pointBorderColor: 'rgba(59, 130, 246, 0.8)',
  //               pointBorderWidth: 2
  //             },
  //             {
  //               label: 'Orders',
  //               data: [42, 53, 48, 65, 59, 78, 76],
  //               backgroundColor: 'rgba(99, 102, 241, 0.05)',
  //               borderColor: 'rgba(99, 102, 241, 0.4)',
  //               borderWidth: 2,
  //               fill: true,
  //               tension: 0.4,
  //               pointRadius: 4,
  //               pointBackgroundColor: '#fff',
  //               pointBorderColor: 'rgba(99, 102, 241, 0.4)',
  //               pointBorderWidth: 2,
  //               yAxisID: 'y1'
  //             }
  //           ]
  //         },
  //         options: {
  //           responsive: true,
  //           maintainAspectRatio: false,
  //           plugins: {
  //             legend: {
  //               display: false
  //             },
  //             tooltip: {
  //               mode: 'index',
  //               intersect: false,
  //               backgroundColor: 'rgba(255, 255, 255, 0.9)',
  //               titleColor: '#1f2937',
  //               bodyColor: '#6b7280',
  //               borderColor: '#e5e7eb',
  //               borderWidth: 1,
  //               padding: 12,
  //               boxPadding: 6,
  //               usePointStyle: true,
  //               callbacks: {
  //                 label: function(context: any) {
  //                   let label = context.dataset.label || '';
  //                   if (label) {
  //                     label += ': ';
  //                   }
  //                   if (context.datasetIndex === 0) {
  //                     label += '$' + context.raw.toLocaleString();
  //                   } else {
  //                     label += context.raw;
  //                   }
  //                   return label;
  //                 }
  //               }
  //             }
  //           },
  //           scales: {
  //             x: {
  //               grid: {
  //                 display: false
  //               },
  //               ticks: {
  //                 color: '#6b7280'
  //               }
  //             },
  //             y: {
  //               position: 'left',
  //               min: 0,
  //               grid: {
  //                 color: '#e5e7eb'
  //               },
  //               ticks: {
  //                 color: '#6b7280',
  //                 callback: function(value: any) {
  //                   return '$' + value.toLocaleString();
  //                 }
  //               }
  //             },
  //             y1: {
  //               position: 'right',
  //               min: 0,
  //               grid: {
  //                 display: false
  //               },
  //               ticks: {
  //                 color: '#6b7280'
  //               }
  //             }
  //           }
  //         }
  //       });
  //     }
  //   }
  // }

  initSalesChart(): void {
    new Chart('salesChart', {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April','May','June','july','August','September','October','November','December'],
        datasets: [{
          label: 'Sales',
          data: [
            this.monthlySales.January,
            this.monthlySales.February,
            this.monthlySales.March,
            this.monthlySales.April,
            this.monthlySales.May,
            this.monthlySales.June,
            this.monthlySales.july,
            this.monthlySales.August,
            this.monthlySales.September,
            this.monthlySales.October,
            this.monthlySales.November,
            this.monthlySales.December
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          minBarLength:1
        }]
      },
      options: {
        scales: {
          x: { type: 'category'}, // ✅ Make sure category scale is registered
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 2
            }},
        },
        responsive: true,
        maintainAspectRatio: false

      }
    });
  }

  setTimeFilter(filter: string): void {
    this.selectedTimeFilter = filter;
    // Here you would update chart data based on selected filter
  }

  isActiveTimeFilter(filter: string): boolean {
    return this.selectedTimeFilter === filter;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Prevent memory leaks
    }
  }


}
