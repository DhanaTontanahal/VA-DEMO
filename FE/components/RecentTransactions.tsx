import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "./BankTabItem";
import BankInfo from "./BankInfo";
import TransactionsTable from "./TransactionsTable";
import { Pagination } from "./Pagination";
import RecentTransaction from "../components/RecentTransaction";

const RecentTransactions = ({
  accounts,
  transactions = [],
  appwriteItemId,
  page = 1,
}: RecentTransactionsProps) => {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent transactions</h2>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="view-all-btn"
        >
          View all
        </Link>
      </header>

      <RecentTransaction />

      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList className="recent-transactions-tablist">
          {accounts.map((account: Account) => (
            <TabsTrigger key={account.id} value={account.appwriteItemId}>
              <BankTabItem
                key={account.id}
                account={account}
                appwriteItemId={appwriteItemId}
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {accounts.map((account: Account) => (
          <TabsContent
            value={account.appwriteItemId}
            key={account.id}
            className="space-y-4"
          >
            <BankInfo
              account={account}
              appwriteItemId={appwriteItemId}
              type="full"
            />

            <TransactionsTable
              transactions={[
                {
                  id: "txn001",
                  $id: "rec001",
                  name: "John Doe",
                  paymentChannel: "Online",
                  type: "Debit",
                  accountId: "ACC123456",
                  amount: 150.75,
                  pending: false,
                  category: "Shopping",
                  date: "2023-12-15",
                  image: "https://example.com/images/txn001.png",
                  $createdAt: "2023-12-15T14:35:00Z",
                  channel: "Web",
                  senderBankId: "BANK123",
                  receiverBankId: "BANK456",
                },
                {
                  id: "txn002",
                  $id: "rec002",
                  name: "Jane Smith",
                  paymentChannel: "POS",
                  type: "Credit",
                  accountId: "ACC654321",
                  amount: 250.0,
                  pending: true,
                  category: "Dining",
                  date: "2024-01-05",
                  image: "https://example.com/images/txn002.png",
                  $createdAt: "2024-01-05T18:20:00Z",
                  channel: "Mobile",
                  senderBankId: "BANK789",
                  receiverBankId: "BANK012",
                },
                {
                  id: "txn003",
                  $id: "rec003",
                  name: "Alice Brown",
                  paymentChannel: "ATM",
                  type: "Withdrawal",
                  accountId: "ACC789123",
                  amount: 500.0,
                  pending: false,
                  category: "Cash",
                  date: "2024-01-10",
                  image: "https://example.com/images/txn003.png",
                  $createdAt: "2024-01-10T09:15:00Z",
                  channel: "ATM",
                  senderBankId: "BANK345",
                  receiverBankId: "BANK678",
                },
              ]}
            />

            {totalPages > 1 && (
              <div className="my-4 w-full">
                <Pagination totalPages={totalPages} page={page} />
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
