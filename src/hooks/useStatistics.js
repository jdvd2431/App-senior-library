import { useState, useEffect } from "react";
import {
  popularBooks,
  activeUser,
  loanByCategory,
  averageDuration,
  loanTrend,
  userOverdeuLoan
} from "../services/statistics"; // Assuming the path is correct

const useStatistics = () => {
  const [data, setData] = useState({
    popularBooks: [],
    activeUsers: [],
    loanByCategorys: [],
    averangeDurations: [],
    loanTrends: [],
    userOverdeuLoans: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const popularResponse = await popularBooks();
        const activeResponse = await activeUser();
        const loanByCategoryResponse = await loanByCategory();
        const averageDurationResponse = await averageDuration();
        const loanTrendsResponse = await loanTrend();
        const userOverdeuLoansResponse = await userOverdeuLoan();
        setData({
          popularBooks: popularResponse,
          activeUsers: activeResponse,
          loanByCategorys: loanByCategoryResponse,
          averangeDurations: averageDurationResponse,
          loanTrends: loanTrendsResponse,
          userOverdeuLoans: userOverdeuLoansResponse,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return { data, error };
};

export default useStatistics;
