import React, { useState } from 'react';
import {
    FaCalendarAlt,
    FaCheck,
    FaCreditCard,
    FaDownload,
    FaFileInvoiceDollar,
    FaInfoCircle,
    FaPrint,
    FaRegClock,
    FaSearch,
    FaTimesCircle,
    FaUserMd
} from 'react-icons/fa';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const PageTitle = styled.h1`
  margin-bottom: 0.5rem;
  color: #2d3748;
`;

const PageSubtitle = styled.p`
  margin-bottom: 2rem;
  color: #718096;
  font-size: 1rem;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 250px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
`;

const FilterDropdown = styled.select`
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  color: #4a5568;
  background-color: white;
  min-width: 150px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const InvoicesTable = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
  padding: 1rem 1.5rem;
  background-color: #f7fafc;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 600;
  color: #4a5568;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  align-items: center;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f7fafc;
  }
  
  @media (max-width: 768px) {
    display: block;
    padding: 1rem;
    position: relative;
  }
`;

const TableCell = styled.div`
  @media (max-width: 768px) {
    display: flex;
    padding: 0.5rem 0;
    
    &:before {
      content: attr(data-label);
      font-weight: 600;
      width: 40%;
      margin-right: 1rem;
    }
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  gap: 0.25rem;
  background-color: ${({ status }) => {
    switch (status) {
      case 'paid':
        return '#38a16920';
      case 'pending':
        return '#ed8a1920';
      case 'overdue':
        return '#e53e3e20';
      default:
        return '#a0aec020';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'paid':
        return '#38a169';
      case 'pending':
        return '#ed8a19';
      case 'overdue':
        return '#e53e3e';
      default:
        return '#a0aec0';
    }
  }};
`;

const Amount = styled.span<{ status: string }>`
  font-weight: 600;
  color: ${({ status }) => status === 'paid' ? '#38a169' : '#4a5568'};
`;

const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  color: #3182ce;
  font-size: 0.875rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  
  &:hover {
    background-color: #ebf8ff;
  }
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    margin-top: 0.5rem;
  }
`;

const SummarySection = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SummaryTitle = styled.h2`
  font-size: 1.25rem;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const SummaryCard = styled.div`
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SummaryAmount = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const SummaryLabel = styled.div`
  font-size: 0.875rem;
  color: #718096;
`;

const PaymentMethodsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const PaymentMethodCard = styled.div`
  flex: 1;
  min-width: 200px;
  max-width: 300px;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: border-color 0.2s;
  cursor: pointer;
  
  &:hover {
    border-color: #3182ce;
  }
`;

const CardIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: #f7fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3182ce;
`;

const PaymentMethodInfo = styled.div`
  flex: 1;
`;

const CardNumber = styled.div`
  font-size: 0.875rem;
  color: #2d3748;
  font-weight: 600;
`;

const CardExpiry = styled.div`
  font-size: 0.75rem;
  color: #718096;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #718096;
`;

const PageButton = styled.button<{ active?: boolean }>`
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  border: 1px solid ${({ active }) => active ? '#3182ce' : '#e2e8f0'};
  background-color: ${({ active }) => active ? '#ebf8ff' : 'white'};
  color: ${({ active }) => active ? '#3182ce' : '#4a5568'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    border-color: #3182ce;
    background-color: #ebf8ff;
    color: #3182ce;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: #e2e8f0;
    background-color: #f7fafc;
    color: #a0aec0;
  }
`;

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  service: string;
  doctor: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate?: string;
  paidDate?: string;
}

const Billing: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const invoicesPerPage = 5;
  
  // Mock invoice data - in a real app this would come from an API
  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2023-001',
      date: 'Oct 15, 2023',
      service: 'General Consultation',
      doctor: 'Dr. Sarah Johnson',
      amount: 150,
      status: 'paid',
      paidDate: 'Oct 16, 2023'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2023-002',
      date: 'Sep 28, 2023',
      service: 'Blood Test & Analysis',
      doctor: 'Dr. Michael Brown',
      amount: 85,
      status: 'paid',
      paidDate: 'Sep 30, 2023'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2023-003',
      date: 'Nov 3, 2023',
      service: 'Cardiology Consultation',
      doctor: 'Dr. Emily Davis',
      amount: 220,
      status: 'pending',
      dueDate: 'Nov 17, 2023'
    },
    {
      id: '4',
      invoiceNumber: 'INV-2023-004',
      date: 'Aug 12, 2023',
      service: 'Annual Physical Exam',
      doctor: 'Dr. Robert Taylor',
      amount: 175,
      status: 'paid',
      paidDate: 'Aug 12, 2023'
    },
    {
      id: '5',
      invoiceNumber: 'INV-2023-005',
      date: 'Sep 5, 2023',
      service: 'Prescription Renewal',
      doctor: 'Dr. Sarah Johnson',
      amount: 65,
      status: 'overdue',
      dueDate: 'Sep 19, 2023'
    },
    {
      id: '6',
      invoiceNumber: 'INV-2023-006',
      date: 'Oct 22, 2023',
      service: 'X-Ray Service',
      doctor: 'Dr. Michael Brown',
      amount: 130,
      status: 'pending',
      dueDate: 'Nov 5, 2023'
    },
    {
      id: '7',
      invoiceNumber: 'INV-2023-007',
      date: 'Jul 18, 2023',
      service: 'Dental Cleaning',
      doctor: 'Dr. Lisa Murphy',
      amount: 95,
      status: 'paid',
      paidDate: 'Jul 19, 2023'
    }
  ];
  
  // Filter invoices based on search term and status filter
  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearchTerm = 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') {
      return matchesSearchTerm;
    } else {
      return matchesSearchTerm && invoice.status === statusFilter;
    }
  });
  
  // Sort invoices - most recent first
  const sortedInvoices = [...filteredInvoices].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
  
  // Paginate invoices
  const indexOfLastInvoice = currentPage * invoicesPerPage;
  const indexOfFirstInvoice = indexOfLastInvoice - invoicesPerPage;
  const currentInvoices = sortedInvoices.slice(indexOfFirstInvoice, indexOfLastInvoice);
  const totalPages = Math.ceil(sortedInvoices.length / invoicesPerPage);
  
  // Calculate summary data
  const totalPaid = invoices
    .filter(invoice => invoice.status === 'paid')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
    
  const totalPending = invoices
    .filter(invoice => invoice.status === 'pending')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
    
  const totalOverdue = invoices
    .filter(invoice => invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  
  // Render status badge with appropriate icon
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <StatusBadge status={status}>
            <FaCheck size={12} />
            Paid
          </StatusBadge>
        );
      case 'pending':
        return (
          <StatusBadge status={status}>
            <FaRegClock size={12} />
            Pending
          </StatusBadge>
        );
      case 'overdue':
        return (
          <StatusBadge status={status}>
            <FaTimesCircle size={12} />
            Overdue
          </StatusBadge>
        );
      default:
        return null;
    }
  };
  
  return (
    <div>
      <PageTitle>Billing & Payments</PageTitle>
      <PageSubtitle>Manage your billing history and payment methods</PageSubtitle>
      
      <SummarySection>
        <SummaryTitle>Billing Summary</SummaryTitle>
        <SummaryGrid>
          <SummaryCard>
            <SummaryAmount>${totalPaid.toFixed(2)}</SummaryAmount>
            <SummaryLabel>Total Paid</SummaryLabel>
          </SummaryCard>
          <SummaryCard>
            <SummaryAmount>${totalPending.toFixed(2)}</SummaryAmount>
            <SummaryLabel>Total Pending</SummaryLabel>
          </SummaryCard>
          <SummaryCard>
            <SummaryAmount>${totalOverdue.toFixed(2)}</SummaryAmount>
            <SummaryLabel>Total Overdue</SummaryLabel>
          </SummaryCard>
        </SummaryGrid>
        
        {totalPending > 0 || totalOverdue > 0 ? (
          <PaymentMethodsContainer>
            <PaymentMethodCard>
              <CardIcon>
                <FaCreditCard size={24} />
              </CardIcon>
              <PaymentMethodInfo>
                <CardNumber>**** **** **** 4321</CardNumber>
                <CardExpiry>Expires 05/25</CardExpiry>
              </PaymentMethodInfo>
            </PaymentMethodCard>
            <PaymentMethodCard>
              <CardIcon>
                <FaCreditCard size={24} />
              </CardIcon>
              <PaymentMethodInfo>
                <CardNumber>**** **** **** 8765</CardNumber>
                <CardExpiry>Expires 09/24</CardExpiry>
              </PaymentMethodInfo>
            </PaymentMethodCard>
          </PaymentMethodsContainer>
        ) : null}
      </SummarySection>
      
      <FiltersContainer>
        <SearchContainer>
          <SearchIcon>
            <FaSearch />
          </SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Search by invoice number, service, or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        
        <FilterDropdown 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Invoices</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </FilterDropdown>
      </FiltersContainer>
      
      <InvoicesTable>
        <TableHeader>
          <div>Invoice #</div>
          <div>Service</div>
          <div>Date</div>
          <div>Amount</div>
          <div>Status</div>
          <div>Actions</div>
        </TableHeader>
        
        {currentInvoices.map(invoice => (
          <TableRow key={invoice.id}>
            <TableCell data-label="Invoice #">
              {invoice.invoiceNumber}
            </TableCell>
            <TableCell data-label="Service">
              <div>{invoice.service}</div>
              <div style={{ fontSize: '0.75rem', color: '#718096', marginTop: '0.25rem' }}>
                <FaUserMd style={{ marginRight: '0.25rem' }} />
                {invoice.doctor}
              </div>
            </TableCell>
            <TableCell data-label="Date">
              <div>
                <FaCalendarAlt style={{ marginRight: '0.25rem' }} />
                {invoice.date}
              </div>
              {invoice.status === 'paid' && invoice.paidDate && (
                <div style={{ fontSize: '0.75rem', color: '#718096', marginTop: '0.25rem' }}>
                  Paid on {invoice.paidDate}
                </div>
              )}
              {invoice.status !== 'paid' && invoice.dueDate && (
                <div style={{ fontSize: '0.75rem', color: invoice.status === 'overdue' ? '#e53e3e' : '#718096', marginTop: '0.25rem' }}>
                  Due on {invoice.dueDate}
                </div>
              )}
            </TableCell>
            <TableCell data-label="Amount">
              <Amount status={invoice.status}>${invoice.amount.toFixed(2)}</Amount>
            </TableCell>
            <TableCell data-label="Status">
              {renderStatusBadge(invoice.status)}
            </TableCell>
            <TableCell data-label="Actions">
              <ActionButtonGroup>
                <ActionButton title="View Details">
                  <FaInfoCircle />
                </ActionButton>
                <ActionButton title="Download Invoice">
                  <FaDownload />
                </ActionButton>
                <ActionButton title="Print Invoice">
                  <FaPrint />
                </ActionButton>
                {invoice.status !== 'paid' && (
                  <ActionButton title="Pay Now">
                    <FaFileInvoiceDollar />
                  </ActionButton>
                )}
              </ActionButtonGroup>
            </TableCell>
          </TableRow>
        ))}
      </InvoicesTable>
      
      <Pagination>
        <span>Page {currentPage} of {totalPages}</span>
        <PageButton
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        >
          &lt;
        </PageButton>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <PageButton
            key={page}
            active={page === currentPage}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </PageButton>
        ))}
        <PageButton
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        >
          &gt;
        </PageButton>
      </Pagination>
    </div>
  );
};

export default Billing; 