import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { AdminService } from 'src/app/core/services/admin/admin.service';

@Component({
  selector: 'app-analytics-report',
  templateUrl: './analytics-report.component.html',
  styleUrls: ['./analytics-report.component.css'],
})
export class AnalyticsReportComponent implements OnInit {
  analytics: any = null;
  role: 'owner' | 'staff' | null = null;
  showRevenueChart = false;
  loading = true;

  // Line Chart for Revenue
  lineChartData: ChartData<'line'> = { labels: [], datasets: [] };
  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
          callback: function (value) {
            return '₦' + value;
          },
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
        },
      },
    },
  };
  lineChartType: ChartType = 'line';

  // Pie Chart for Specialist Distribution
  pieChartData: ChartData<'pie'> = { labels: [], datasets: [] };
  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
        },
      },
    },
  };
  pieChartType: ChartType = 'pie';

  // Revenue by Consultation Type Pie Chart
  revenuePieChartData: ChartData<'pie'> = { labels: [], datasets: [] };

  // Bar Chart for Consultation Status
  consultationStatusData: ChartData<'bar'> = { labels: [], datasets: [] };
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
        },
      },
    },
  };
  barChartType: ChartType = 'bar';

  constructor(
    private adminService: AdminService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.role = this.adminService.getRole();
    this.loadAnalytics();
  }

  // Add after loading analytics
  loadAnalytics() {
    this.loading = true;
    this.adminService.getAnalytics().subscribe((data) => {
      console.log('Analytics data:', data);

      this.analytics = { ...data };

      if (this.role === 'owner') {
        this.showRevenueChart = true;

        // Set line chart data
        this.lineChartData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: data.monthlyRevenue || [],
        };

        // Set revenue by consultation type pie chart
        this.revenuePieChartData = {
          labels: [
            'Online Consultations',
            'Physical Consultations',
            'Emergency Services',
          ],
          datasets: [
            {
              data: [
                data.revenueBreakdown?.online || 150000,
                data.revenueBreakdown?.physical || 120000,
                data.revenueBreakdown?.emergency || 50000,
              ],
              backgroundColor: ['#0d6efd', '#20c997', '#dc3545'],
            },
          ],
        };
      } else {
        this.showRevenueChart = false;
        this.lineChartData = { labels: [], datasets: [] };
      }

      // Set specialist distribution pie chart
      if (data.specialistDistribution) {
        this.pieChartData = {
          labels: data.specialistDistribution.labels || [],
          datasets: data.specialistDistribution.datasets || [],
        };
      }

      // Set consultation status bar chart
      this.consultationStatusData = {
        labels: ['Completed', 'Pending', 'Ongoing', 'Cancelled'],
        datasets: [
          {
            data: [
              data.consultationSummary?.completed || 45,
              data.consultationSummary?.pending || 12,
              data.consultationSummary?.ongoing || 8,
              data.consultationSummary?.cancelled || 5,
            ],
            backgroundColor: ['#28a745', '#ffc107', '#17a2b8', '#dc3545'],
            label: 'Consultations',
          },
        ],
      };

      this.loading = false;
      this.cdr.detectChanges();

      // Force chart resize after data is loaded and after a short delay
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    });
  }

  // Add method to handle window resize
  @HostListener('window:resize')
  onWindowResize() {
    // Force chart redraw on resize
    if (this.lineChartData.datasets.length > 0) {
      this.lineChartData = { ...this.lineChartData };
    }
    if (this.pieChartData.datasets.length > 0) {
      this.pieChartData = { ...this.pieChartData };
    }
    if (this.revenuePieChartData?.datasets?.length > 0) {
      this.revenuePieChartData = { ...this.revenuePieChartData };
    }
    if (this.consultationStatusData.datasets.length > 0) {
      this.consultationStatusData = { ...this.consultationStatusData };
    }
  }
}
