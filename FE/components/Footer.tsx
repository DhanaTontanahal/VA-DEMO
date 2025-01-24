import { logoutAccount } from "@/lib/actions/user.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  console.log(user);
  //   {
  //     "email": "urwithdhanu@gmail.com",
  //     "userId": "678e11660010007b79cd",
  //     "dwollaCustomerUrl": "https://api-sandbox.dwolla.com/customers/24010b6d-0f88-485a-9712-928fd42ce0fa",
  //     "dwollaCustomerId": "24010b6d-0f88-485a-9712-928fd42ce0fa",
  //     "firstName": "Dhana Shekhar",
  //     "lastName": "Tontanahal",
  //     "address1": "Bolarum 302 3rd floor",
  //     "city": "New york city",
  //     "postalCode": "12345",
  //     "dateOfBirth": "1992-08-29",
  //     "ssn": "1234",
  //     "state": "NY",
  //     "$id": "678e1168001fe040c0b3",
  //     "$createdAt": "2025-01-20T09:03:35.520+00:00",
  //     "$updatedAt": "2025-01-20T09:03:35.520+00:00",
  //     "$permissions": [],
  //     "$databaseId": "678db84b003b1c0be394",
  //     "$collectionId": "678db85f000b94da457f"
  // }
  const router = useRouter();

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();

    if (loggedOut) router.push("/sign-in");
  };

  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">{user?.firstName[0]}</p>
      </div>

      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-14 truncate text-gray-700 font-semibold">
          {user?.firstName}
        </h1>
        <p className="text-14 truncate font-normal text-gray-600">
          {user?.email}
        </p>
      </div>

      <div className="footer_image" onClick={handleLogOut}>
        <Image src="icons/logout.svg" fill alt="jsm" />
      </div>
    </footer>
  );
};

export default Footer;
