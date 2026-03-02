import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { AdminService } from 'src/app/core/services/admin/admin.service';

@Component({
  selector: 'app-detailed-reports',
  templateUrl: './detailed-reports.component.html',
  styleUrls: ['./detailed-reports.component.css']
})
export class DetailedReportsComponent implements OnInit{

   // Date range filter
  startDate: string = '';
  endDate: string = '';

  // Summary stats
  totalConsultations = 0;
  totalRevenue = 0;
  totalPatients = 0;
  totalSpecialists = 0;

  // Tables data
  recentConsultations: any[] = [];
  topSpecialists: any[] = [];
  revenueByMonth: any[] = [];

  // Chart data for revenue trend (optional)
  lineChartData: ChartData<'line'> = { labels: [], datasets: [] };
  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#ffffff' } } },
    scales: {
      y: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(255,255,255,0.1)' } },
      x: { ticks: { color: '#ffffff' }, grid: { color: 'rgba(255,255,255,0.1)' } }
    }
  };
  lineChartType: ChartType = 'line';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    // Use analytics data from service to populate
    this.adminService.getAnalytics().subscribe(data => {
      this.totalConsultations = data.consultationSummary?.total || 0;
      this.totalRevenue = data.revenue?.total || 0;
      this.totalPatients = data.patients?.total || 0;
      this.totalSpecialists = data.totalSpecialists || 0;

      // Use dummy data for tables
      this.recentConsultations = [
        { patient: 'Chukwu Isioma', specialist: 'Dr. Akinwande', date: '2025-02-10', amount: 15000, status: 'completed' },
        { patient: 'Oluwaseun Adebayo', specialist: 'Dr. Ngozi Eze', date: '2025-02-12', amount: 30000, status: 'ongoing' },
        { patient: 'Blessing Okoro', specialist: 'Dr. Chidi Okonkwo', date: '2025-02-13', amount: 15000, status: 'completed' },
        { patient: 'Musa Abubakar', specialist: 'Dr. Funmi Adebayo', date: '2025-02-14', amount: 15000, status: 'pending' },
        { patient: 'Ngozi Eze', specialist: 'Dr. Emeka Okafor', date: '2025-02-15', amount: 30000, status: 'ongoing' }
      ];

      this.topSpecialists = data.topSpecialists || [];

      this.revenueByMonth = [
        { month: 'Jan', revenue: 12000 },
        { month: 'Feb', revenue: 15000 },
        { month: 'Mar', revenue: 18000 },
        { month: 'Apr', revenue: 22000 },
        { month: 'May', revenue: 25000 },
        { month: 'Jun', revenue: 32000 }
      ];

      // Set chart data
      this.lineChartData = {
        labels: this.revenueByMonth.map(r => r.month),
        datasets: [{
          data: this.revenueByMonth.map(r => r.revenue),
          label: 'Revenue',
          backgroundColor: '#0d6efd',
          borderColor: '#0d6efd',
          fill: false,
          tension: 0.4
        }]
      };
    });
  }

  applyDateFilter(): void {
    // In a real app, filter data based on date range
    console.log('Filter from', this.startDate, 'to', this.endDate);
    // Reload with filtered data (dummy for now)
    this.loadReports();
  }

  exportToCSV(): void {
    // Convert table data to CSV and download
    const csvData = this.convertToCSV(this.recentConsultations, ['patient', 'specialist', 'date', 'amount', 'status']);
    this.downloadFile(csvData, 'consultations_report.csv', 'text/csv');
  }

  exportToPDF(): void {
    alert('PDF export would be implemented here.');
    // In real app, use a library like jspdf
  }

  private convertToCSV(data: any[], headers: string[]): string {
    const csvRows = [];
    csvRows.push(headers.join(','));
    for (const row of data) {
      const values = headers.map(header => JSON.stringify(row[header] || '').replace(/"/g, '""'));
      csvRows.push(values.join(','));
    }
    return csvRows.join('\n');
  }

  private downloadFile(content: string, fileName: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }


}
