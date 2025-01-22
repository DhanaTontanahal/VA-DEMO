import HeaderBox from "@/components/HeaderBox";
import { Pagination } from "@/components/Pagination";
import TransactionsTable from "@/components/TransactionsTable";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { formatAmount } from "@/lib/utils";
import React from "react";

const TransactionHistory = async ({
  searchParams: { id, page },
}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  const rowsPerPage = 10;
  const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);

  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = account?.transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  return (
    <div className="transactions">
      <div className="transactions-header">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>

      <div className="space-y-6">
        <div className="transactions-account">
          <div className="flex flex-col gap-2">
            <h2 className="text-18 font-bold text-white">
              {account?.data.name}
            </h2>
            <p className="text-14 text-blue-25">{account?.data.officialName}</p>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● {account?.data.mask}
            </p>
          </div>

          <div className="transactions-account-balance">
            <p className="text-14">Current balance</p>
            <p className="text-24 text-center font-bold">
              {formatAmount(account?.data.currentBalance)}
            </p>
          </div>
        </div>

        <section className="flex w-full flex-col gap-6">
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
              <Pagination totalPages={totalPages} page={currentPage} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default TransactionHistory;
