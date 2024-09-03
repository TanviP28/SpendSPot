import * as d3 from 'd3';

export function ExpenseChart() {
  useEffect(() => {
    const svg = d3.select("#expenseChart")
                  .append("svg")
                  .attr("width", 400)
                  .attr("height", 400);

    const data = [1200, 300, 500, 150, 200];

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 80)
      .attr("y", d => 400 - d)
      .attr("width", 50)
      .attr("height", d => d)
      .attr("fill", "#4bc0c0");
  }, []);

  return <div id="expenseChart" />;
}
