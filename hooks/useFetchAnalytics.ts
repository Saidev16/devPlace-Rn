import { supabase } from "@/lib/supabase";
import {
  chartDataPoint,
  chartDataResult,
  selectedPeriodType,
} from "@/types/types";
import { getDateRange, transformData } from "@/utils";
import { transform } from "@babel/core";
import { useEffect, useState } from "react";

export const useFetchAnalytics = (
  period: selectedPeriodType
): { data: chartDataResult[]; loading: boolean; errorMsg: string } => {
  const [data, setData] = useState<{
    data: chartDataResult[];
    maxValue: number;
  }>({ data: [], maxValue: 0 });
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const { startDate, endDate, labels } = getDateRange(period);

  useEffect(() => {
    const fetchData = async (period: selectedPeriodType) => {
      try {
        console.log("fetching data 1");
        setLoading(true);
        const { data: tasks, error } = await supabase
          .from("tasks")
          .select(`date,isDone`)
          .gte("date", startDate.toISOString())
          .lte("date", endDate.toISOString());
        if (error) {
          setErrorMsg(error.message ?? "An error occured while fetching data");
        }

        const { data: transformedData, maxValue: maxValue } = transformData(
          tasks,
          period,
          labels
        );
        setData({ data: transformedData, maxValue: maxValue });
      } catch (error) {
        throw new Error("error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData(period);
  }, [period]);

  return { data, loading, errorMsg };
};
