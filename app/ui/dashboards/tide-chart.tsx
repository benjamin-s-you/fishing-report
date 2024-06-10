"use client";

import React from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { TidePredictions } from "@/app/lib/tide/types";
import "chartjs-adapter-moment";
import moment from "moment";

export function TideChart({ tideData }: { tideData: TidePredictions }) {
  const currentTime = moment();
  const minTime = moment().startOf("day");
  const maxTime = moment().startOf("day").add(1, "days");

  const currentTimeLinePlugin = {
    id: "currentTimeLine",
    beforeDraw: (chart) => {
      const ctx = chart.ctx;
      const xAxis = chart.scales["x"];
      const yAxis = chart.scales["y"];
      const currentTimePosition = xAxis.getPixelForValue(currentTime);

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(currentTimePosition, yAxis.top);
      ctx.lineTo(currentTimePosition, yAxis.bottom);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 87, 121, 1)";
      ctx.stroke();

      ctx.font = "10px Arial";
      ctx.fillStyle = "rgba(255, 87, 121, 1)";
      ctx.textAlign = "center";
      const label = currentTime.format("h:mm A");
      ctx.fillText(label, currentTimePosition, yAxis.top - 5);

      ctx.restore();
    },
  };

  const data = {
    labels: tideData.predictions.map((prediction) => new Date(prediction.date)),
    datasets: [
      {
        label: "Water Level",
        data: tideData.predictions.map((prediction) => prediction.height),
        borderColor: "rgba(24, 153, 227, 1)",
        backgroundColor: "rgba(24, 153, 227, 0.2)",
        fill: true,
        tension: 0.4, // Curved lines
        datalabels: {
          align: "top",
          anchor: "end",
          formatter: function (value, context) {
            const time = moment(context.chart.data.labels[context.dataIndex]);
            // Only display the label if the time is within the min and max range
            if (time.isBetween(minTime, maxTime, null, "[]")) {
              return time.format("h:mm A");
            } else {
              return null; // Return an empty string if the label is outside the range
            }
          },
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Remove the legend
      },
      datalabels: {
        backgroundColor: "#3080d0",
        color: "white",
        font: {
          size: 10,
        },
        padding: 4,
        borderRadius: 4,
      },
      // tooltip: {
      //   enabled: false,
      // },
    },
    // hover: {
    //   mode: null,
    // },
    layout: {
      padding: {
        top: 40,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          displayFormats: {
            hour: "h:mm A", // Format for the X-axis labels
          },
        },
        title: {
          display: true,
          text: "Time",
        },
        min: minTime,
        max: maxTime,
        grid: {
          drawTicks: false, // Hide tick marks on the X-axis but keep grid lines
        },
        ticks: {
          display: true, // Show labels on the X-axis
          padding: 10, // Add padding between the graph and the labels
          stepSize: 6,
        },
      },
      y: {
        title: {
          display: true,
          text: "Height (ft)",
        },
        grid: {
          drawTicks: false, // Hide tick marks on the X-axis but keep grid lines
        },
        ticks: {
          display: true, // Show labels on the X-axis
          padding: 10, // Add padding between the graph and the labels
        },
      },
    },
  };

  return (
    <Line data={data} options={options} plugins={[currentTimeLinePlugin]} />
  );
}
