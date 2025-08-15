import {
  Bar,
  BarChart,
  Pie,
  PieChart,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer } from "../ui/chart";

const COLORS = [
  "#34d399",
  "#60a5fa",
  "#fbbf24",
  "#f87171",
  "#a78bfa",
  "#f472b6",
  "#4ade80",
  "#38bdf8",
  "#fb923c",
  "#c084fc",
];

export function Charts({ data }: { data: any[] }) {
  // Filter alcoholic drinks
  const alcoholicDrinks = data.filter(
    (drink) => drink.strAlcoholic === "Alcoholic"
  );

  // Bar Chart Data --- Alcohol ingredients frequency
  const alcoholCountMap: Record<string, number> = {};

  alcoholicDrinks.forEach((drink) => {
    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      if (ingredient) {
        alcoholCountMap[ingredient] = (alcoholCountMap[ingredient] || 0) + 1;
      }
    }
  });

  const alcoholData = Object.entries(alcoholCountMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10

  // Pie Chart Data --- Glass type distribution
  const glassCountMap: Record<string, number> = {};

  data.forEach((drink) => {
    const glass = drink.strGlass || "Unknown";
    glassCountMap[glass] = (glassCountMap[glass] || 0) + 1;
  });

  const glassData = Object.entries(glassCountMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Bar Chart */}
      <ChartContainer
        config={{}}
        className="overflow-x-auto w-[92vw] md:w-[87vw] lg:w-full h-[200px] md:h-[300px] md:h-[400px] lg:h-[450px] p-4 border rounded-lg bg-white shadow scrollbar-hide"
        title="Most Used Alcoholic Ingredients"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={alcoholData}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#60a5fa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      {/* Pie Chart */}
      <ChartContainer
        config={{}}
        className="overflow-x-auto w-[92vw] md:w-[87vw] lg:w-full h-[250px] md:h-[300px] md:h-[400px] lg:h-[450px] p-4 border rounded-lg bg-white shadow scrollbar-hide"
        title="Glass Type Distribution"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={glassData}
              cx="50%"
              cy="50%"
              outerRadius="80%"
              dataKey="value"
              label={({ name }) => name}
            >
              {glassData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
