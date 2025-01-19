import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";
const chartConfig = {
  desktop: {
    label: "rejected",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "requested",
    color: "hsl(var(--chart-2))",
  },
};

export function AreaChartCustom({
  totalSales,
  inTotal,
  rejectedTotal,
  rejectedUnpaid,
}) {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>
            Total Unpaid Sales - (${inTotal || 0}) and Rejected Sales - ($
            {rejectedTotal || 0})
          </CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <ResponsiveContainer width={"100%"} height={"100%"}>
            <AreaChart data={rejectedUnpaid}>
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-mobile)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="_id"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                label={"Total Unpaid And Rejected Statics"}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="products"
                type="natural"
                fill="url(#fillMobile)"
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="totalPrice"
                type="natural"
                fill="url(#fillDesktop)"
                stroke="var(--color-desktop)"
                stackId="a"
              />
              <ChartLegend
                content={() => (
                  <div className="flex gap-4 justify-center mt-4">
                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          backgroundColor: chartConfig.desktop.color,
                          display: "inline-block",
                          width: 12,
                          height: 12,
                          borderRadius: "10%",
                        }}
                      ></span>
                      <span>{chartConfig.desktop.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        style={{
                          backgroundColor: chartConfig.mobile.color,
                          display: "inline-block",
                          width: 12,
                          height: 12,
                          borderRadius: "10%",
                        }}
                      ></span>
                      <span>{chartConfig.mobile.label}</span>
                    </div>
                  </div>
                )}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
