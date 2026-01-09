import Image from "next/image";
import Card from "@/components/shared/Card";
import Button from "@/components/shared/Button";
import { FileText, Download, TrendingUp, Users, Heart, DollarSign } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const metadata = {
  title: "Annual Reports & Financial Transparency - Jaasiel Foundation",
  description: "Access our annual reports, financial statements, and transparency documents.",
};

const reports = [
  {
    id: 1,
    year: "2023",
    title: "Annual Report 2023",
    description: "Comprehensive overview of our programs, impact, and financial performance in 2023.",
    pdf: "/reports/annual-report-2023.pdf",
    image: "/assets/img/about/1.jpg",
    stats: {
      beneficiaries: "5,000+",
      programs: 12,
      funds: "₹50 Lakhs",
      volunteers: 150,
    },
  },
  {
    id: 2,
    year: "2022",
    title: "Annual Report 2022",
    description: "A year of growth and expanded impact across education, healthcare, and community development.",
    pdf: "/reports/annual-report-2022.pdf",
    image: "/assets/img/about/2.jpg",
    stats: {
      beneficiaries: "4,200+",
      programs: 10,
      funds: "₹42 Lakhs",
      volunteers: 120,
    },
  },
  {
    id: 3,
    year: "2021",
    title: "Annual Report 2021",
    description: "Navigating challenges and continuing our mission during unprecedented times.",
    pdf: "/reports/annual-report-2021.pdf",
    image: "/assets/img/about/3.jpg",
    stats: {
      beneficiaries: "3,500+",
      programs: 8,
      funds: "₹35 Lakhs",
      volunteers: 100,
    },
  },
];

const financialHighlights = [
  { label: "Total Funds Raised (2023)", value: "₹50 Lakhs", icon: DollarSign },
  { label: "Programs Funded", value: "12", icon: TrendingUp },
  { label: "Direct Beneficiaries", value: "5,000+", icon: Users },
  { label: "Volunteer Hours", value: "15,000+", icon: Heart },
];

export default function ReportsPage() {
  return (
    <div className="py-16 md:py-24">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: "Reports", href: "/reports" },
            ]}
            className="mb-6 text-white/80"
          />
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FileText className="text-white" size={32} />
              <span className="text-lg font-semibold">Transparency</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Annual Reports & Financial Transparency</h1>
            <p className="text-xl max-w-2xl mx-auto">
              We believe in complete transparency. Access our reports and financial statements.
            </p>
          </div>
        </div>
      </div>

      {/* Financial Highlights */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">2023 Financial Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialHighlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <Card key={index} className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <Icon className="text-primary" size={32} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">{highlight.value}</div>
                  <div className="text-gray-600 text-sm">{highlight.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Annual Reports */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Annual Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.map((report) => (
              <Card key={report.id} hover className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={report.image}
                    alt={report.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {report.year}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{report.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{report.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="text-gray-500">Beneficiaries</div>
                      <div className="font-semibold">{report.stats.beneficiaries}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Programs</div>
                      <div className="font-semibold">{report.stats.programs}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Funds</div>
                      <div className="font-semibold">{report.stats.funds}</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Volunteers</div>
                      <div className="font-semibold">{report.stats.volunteers}</div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="md"
                    href={report.pdf}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Download PDF
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Financial Transparency Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Financial Transparency</h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-700 mb-6">
                At Jaasiel Foundation, we are committed to maintaining the highest standards of financial transparency and accountability. We believe that our donors and supporters have the right to know how their contributions are being used.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded">
                    <FileText className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Annual Financial Statements</h3>
                    <p className="text-gray-600 text-sm">
                      Complete audited financial statements are available for download in our annual reports.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded">
                    <TrendingUp className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Program Allocation</h3>
                    <p className="text-gray-600 text-sm">
                      We allocate 85% of funds directly to programs, with only 15% for administrative and operational costs.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded">
                    <Heart className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Impact Measurement</h3>
                    <p className="text-gray-600 text-sm">
                      We regularly measure and report on the impact of our programs to ensure effectiveness and accountability.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-primary/5 rounded-lg">
                <h3 className="font-semibold mb-2">Questions About Our Finances?</h3>
                <p className="text-gray-700 text-sm mb-4">
                  If you have any questions about our financial reports or transparency practices, please don't hesitate to contact us.
                </p>
                <Button variant="primary" size="md" href="/contact">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

