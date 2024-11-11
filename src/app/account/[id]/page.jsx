import AccountPage from "./accountPage";

export const fetchData = async (_id) => {
  // Fetch data from  API
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/Accounts?id=${_id}`   ,
    {
      cache: "no-store",
    }
  );
  const repo = await res.json();
  // Pass data to the page via props

  return repo;
};


export async function generateMetadata({params}) {
 const {id} = params
 const {getAccount} = await fetchData(id);
return {
  title: getAccount.accountName  ,
  description: getAccount.desc,
};

}

export default function Account({ params }) {
  const { id } = params;
  return (
    <div>
      <AccountPage id={id} />
    </div>
  );
}
