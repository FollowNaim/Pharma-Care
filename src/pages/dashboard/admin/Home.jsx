import { AreaChartCustom } from "@/components/charts/AreaChart";
import { BarMultiple } from "@/components/charts/BarMultiple";
import { PieText } from "@/components/charts/PieText";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Home() {
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin stats"],
    queryFn: async () => {
      const { data } = await axios.get("/admin-stats");
      return data;
    },
  });
  if (isLoading) return <p>Loading...</p>;
  console.log(stats);
  return (
    <div className="max-w-4xl mx-auto">
      <div className="my-6">
        <h2 className="text-3xl font-bold">Shop Statistics at a Glance</h2>
        <p className="text-muted-foreground mt-3">
          Category-Wise Sales Overview
        </p>
      </div>
      <div className="grid grid-cols-2 justify-center w-full gap-8">
        <PieText
          inTotal={stats?.totalSales[0]?.totalSales}
          totalSales={stats?.totalSales[0]?.items}
        />
        <BarMultiple
          inTotal={stats?.paidTotal[0]?.totalRevenue}
          totalSales={stats?.paidTotal[0]?.items}
        />
      </div>
      <div className="mt-8">
        <AreaChartCustom
          inTotal={stats?.unpaidTotal[0]?.totalRevenue}
          totalSales={stats?.unpaidTotal[0]?.items}
        />
      </div>
    </div>
  );
}

export default Home;
