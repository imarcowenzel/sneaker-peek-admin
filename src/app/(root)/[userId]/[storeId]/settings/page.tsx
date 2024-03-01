import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import SettingsForm from "./components/settings-form";

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {

  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findUnique({
    where: {
      id: params.storeId,
    },
  });

  if (!store) redirect("/");

  return (
    <div className="mt-5">
      <SettingsForm initialData={store} />
    </div>
  );
};

export default SettingsPage;
