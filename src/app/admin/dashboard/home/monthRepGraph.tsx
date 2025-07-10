/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';

interface MonthData {
  month: string;
  day: number;
  total: number;
}

export interface YearData {
  year: number;
  months: MonthData[];
  total: number;
}

export default function MonthRepGraph(props: { pages: YearData[], buttons: YearData[], submissions: YearData[] }) {

  // Prepare the data for the LineChart (flattened daily data)
  const flattenedData = props.pages.flatMap((yearData) =>
    yearData.months.flatMap((monthData) => ({
      year: yearData.year,  // Pass year explicitly as part of the data
      month: monthData.month,
      day: monthData.day,
      total: monthData.total,
      type: 'Pages'
    }))
  );

  const flattenedReceiptData = props.buttons.flatMap((yearData) =>
    yearData.months.flatMap((monthData) => ({
      year: yearData.year,  // Pass year explicitly as part of the data
      month: monthData.month,
      day: monthData.day,
      total: monthData.total,
      type: 'Buttons'
    }))
  );

  const flattenedBillData = props.submissions.flatMap((yearData) =>
    yearData.months.flatMap((monthData) => ({
      year: yearData.year,  // Pass year explicitly as part of the data
      month: monthData.month,
      day: monthData.day,
      total: monthData.total,
      type: 'Submissions'
    }))
  );

  // Combine pages and receipts data into a single array
  const combinedData = [...flattenedData, ...flattenedReceiptData, ...flattenedBillData];

  // Group the data by year and type (Invoice/Receipt)
  const groupedData = combinedData.reduce((acc, data) => {
    const { year, type, day, total } = data;
    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][type]) {
      acc[year][type] = [];
    }
    acc[year][type].push({ day, total });
    return acc;
  }, {} as Record<number, Record<string, { day: number; total: number }[]>>);

  // Calculate total sales for each year and type
  const calculateTotal = (yearNum: number, type: string) => {
    const typeData = groupedData[yearNum]?.[type] || [];
    return typeData.reduce((total, data: {day: number, total: number}) => total + data.total, 0);
  };

  // Group transformed data for plotting
  const transformedData = combinedData.reduce((acc, data) => {
    const { day, total, type } = data;

    // Find the existing data for the current day
    let dayData = acc.find(item => item.day === day);

    // If no entry exists for this day, create one
    if (!dayData) {
      dayData = { day, Pages: 0, Buttons: 0, Submissions: 0 };
      acc.push(dayData);
    }

    // Add the totalAmount to the correct field (pages or Receipts)
    if (type === 'Pages') {
      dayData.Pages += total;
    } if (type === 'Buttons') {
      dayData.Buttons += total;
    }else if (type === 'Submissions') {
      dayData.Submissions += total;
    }

    return acc;
  }, [] as { day: number, Pages: number, Buttons: number, Submissions: number }[]);


  // Line components for both pages and receipts
  const lineCombinedComponents = [
    ...props.pages.map((yearData) => (
      <Line
        key={`${yearData.year} Page Visits`}
        type="monotone"
        dot={false}
        dataKey="Pages"
        stroke="#992600"
        fill='#992600'  // Green for pages
        name={`${yearData.year} Pages`} // Including year in the name
      />
    )),
    ...props.buttons.map((yearData) => (
      <Line
        key={`${yearData.year} Buttons`}
        dot={false}
        type="monotone"
        dataKey="Buttons"
        fill='#fa3c00'
        stroke='#fa3c00'  // Blue for receipts
        name={`${yearData.year} Buttons`} // Including year in the name
      />
    )),
    ...props.submissions.map((yearData) => (
      <Line
        key={`${yearData.year} Submissions`}
        type="monotone"
        dot={false}
        dataKey="Submissions"
        fill='#FFD2C2'
        stroke="#FFD2C2"  // Blue for receipts
        name={`${yearData.year} Submissions`} // Including year in the name
      />
    ))
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={transformedData}>
        <CartesianGrid strokeDasharray="none" stroke="none" />
        {/* <XAxis dataKey="day" tick={{ fontSize: 12 }} />  XAxis shows days */}
        {/* <YAxis tick={{ fontSize: 12 }} className='hidden' /> */}
        <Tooltip
          content={({ payload, label }) => {
            if (!payload || payload.length === 0) return null;
            const data = payload[0].payload; // Get the first data point for the tooltip
            const { Pages, Buttons, Submissions } = data;

            return (
              <div style={{
                backgroundColor: '#f5f5f5', // Custom background color
                borderRadius: '4px', // Rounded corners
                padding: '5px', // Padding
                fontSize: '12px', // Font size for text
                boxShadow: '0 0px 0px rgba(0, 0, 0, 0.1)', // Shadow effect
                color: '#333', // Text color
              }}>
                <p><strong>Day: </strong>{label}</p>  {/* Showing Day */}
                <p><strong>Page Visits: </strong>{Pages}</p>
                <p><strong>Button Clicks: </strong>{Buttons}</p>
                <p><strong>Form Submissions: </strong>{Submissions}</p>
              </div>
            );
          }}
        />
        <Legend
          content={({ payload }) => {
            return (
              <div style={{ fontSize: '13px', listStyleType: 'none' }} className='grid grid-cols-3 gap-8 mt-4 graph'>
                {payload?.map((entry, index) => {
                  // Split the year and type from the entry value (e.g., "2021 pages")
                  const [year, ...typeParts] = entry.value.split(' ');
                  const type = typeParts.join(' '); // Join the rest of the parts to get the type (pages or Receipts)

                  const yearNum = parseInt(year);  // Convert year to number

                  // Check if yearNum is valid
                  if (isNaN(yearNum)) {
                    console.error('Invalid yearNum:', year);
                    return null;
                  }

                  // Access the typeData from groupedData using the year and type
                  const typeData = groupedData[yearNum]?.[type] || [];  // Safely access type data for this year

                  // Calculate total sales for this year and type
                  const total = calculateTotal(yearNum, type);

                  return (
                    <div key={index} style={{ marginBottom: '10px' }} className='flex flex-col'>
                      <strong>{entry.value}: Total: {total.toLocaleString()}</strong>
                      <div className='graph-scroll'>
                        {typeData.length > 0 ? (
                          typeData.map((data, i) => (
                            <div key={i} className='flex p-1 border-b mt-1'>
                              <span className='mr-5'>Day {data.day}:</span> {data.total}
                            </div>
                          ))
                        ) : (
                          <li>No data available for this type</li>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }}
        />
        {lineCombinedComponents}
      </LineChart>
    </ResponsiveContainer>
  );
}