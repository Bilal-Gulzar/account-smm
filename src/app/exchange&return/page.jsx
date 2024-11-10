import React from 'react'

export default function ExhangeAndReturn() {
  return (
    <main className="max-w-[710px] pb-28 mx-auto">
      <div className="mt-8">
        <h1 className="text-center text-2xl font-medium">
          RETURNS & EXCHANGES
        </h1>
        <p className="px-5 lg:px-0 font-light text-sm  mt-9 ">
          At AccountsMM, customer satisfaction is our priority. However, due to
          the nature of digital goods (verified accounts), we have specific
          guidelines for exchanges and returns. Please read this policy
          carefully before making a purchase.
        </p>
        <div className="text-sm mt-7 px-5 lg:px-0">
          <h2 className="font-medium">&bull; Non-Returnable Products</h2>
          <p className="font-light mt-1">
            All verified accounts sold on our platform (e.g., Payoneer, Amazon,
            Alibaba, etc.) are non-returnable. Once the account credentials have
            been delivered to you, we cannot offer a return or refund due to the
            sensitive nature of the product.
          </p>
        </div>
        <div className="px-5 lg:px-0">
          <h2 className="font-medium text-sm mt-5">&bull; Exchange Policy</h2>
          <p className="text-sm font-light mt-1">
            We understand that mistakes can happen, and in certain cases, you
            may request an exchange. Exchange requests are valid under the
            following conditions:
          </p>
          <ol className="mt-2 px-3 lg:px-0">
            <li className="text-sm font-light">
              <span className="font-medium">Incorrect Account Delivered:</span>{" "}
              If you receive an account that does not match the one you
              purchased (e.g., wrong platform, incorrect country), you are
              eligible for an exchange.
            </li>
            <li className="font-light text-sm mt-2">
              <span className="font-medium">Account Inaccessibility:</span> If
              the account details provided are incorrect, or if you're unable to
              access the account due to a technical issue, we will verify the
              claim and exchange the account if the issue is validated.
            </li>
          </ol>
        </div>
        <div className="px-5 lg:px-0">
          <h2 className="font-medium text-sm mt-5 ">
            &bull; Exchange Process
          </h2>
          <p className="font-light text-sm mt-1">
            If you are eligible for an exchange, follow these steps:
          </p>
          <ul className="mt-2 px-3 lg:px-0">
            <li className="text-sm font-light">
              <span className="font-medium"> Contact Us:</span> Send an email to
              <span className="text-[#3b82f6] font-normal">
                {" "}
                support@accountsmm.com
              </span>{" "}
              or contact our support team via the website with details of the
              issue.
            </li>
            <li className="font-light text-sm mt-2">
              <span className="font-medium"> Verification: </span>Our team will
              review the case within 24 hours to determine if the claim is
              valid. issue.
            </li>
            <li className="font-light text-sm mt-2">
              <span className="font-medium">Exchange Confirmation:</span>If the
              claim is approved, we will issue a new account of the same type as
              the one you purchased within 48 hours.
            </li>
          </ul>
        </div>
        <div className="px-5 lg:px-0">
          <h2 className="font-medium text-sm mt-5 ">
            &bull; No Refund Policy
          </h2>
          <p className="text-sm font-light mt-1">
            We do not offer refunds for any of the verified accounts sold on
            AccountsMM. Once an account is delivered, all sales are final.
            However, in the rare case where we cannot provide a functional
            replacement after an approved exchange request, a store credit may
            be offered.
          </p>
        </div>
        <div className="px-5 lg:px-0 ">
          <h2 className=" font-medium text-sm mt-5">&bull; Contact Us</h2>
          <p className="font-light text-sm mt-1">
            For any queries or support regarding exchanges, you can contact us
            at:
          </p>
          <ul className="font-light text-sm mt-2 px-3 lg:px-0">
            <li>
              <span className="font-medium">Email:</span>{" "}
              <span className="text-[#3b82f6] font-normal">
                support@accountsmm.com
              </span>
            </li>
            <li className="mt-2">
              <span className="font-medium">Support Hours:</span>
              Monday - Friday, 9:00 AM to 6:00 PM
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
