import CustomerSatisfaction from "./_components/CustorSatisfaction";
import RevenueChart from "./_components/RevenueChart";
import TodayArrival from "./_components/TodayArrival";
import TotalBooked from "./_components/TotalBooked";
import TotalEarning from "./_components/TotalEarning";
import TotalUser from "./_components/TotalUser";

export default async function OverViewPage(){
  try {
    const response = await fetch('http://localhost:5000/dashboard/overview')
    const data = await response.json();
    return (
      
        <div className="grid grid-cols-12 gap-6">
              <div className="col-span-6 lg:col-span-3">
                  <TotalUser totalUser={data.totalUsers}/>
              </div>

              <div className="col-span-6 lg:col-span-3">
                  <TotalBooked totalBooked={data.totalBooked}/>
              </div>

              <div className="col-span-6 lg:col-span-3">
                  <TotalEarning totalEarning={data.totalRevenue}/>
              </div>

              <div className="col-span-6 lg:col-span-3">
                  <TodayArrival todayArrival={data.todayArrival}/>
              </div>

              <div className="col-span-12 lg:col-span-8">
                  <RevenueChart revenueData={data.revenueData}/>
              </div>

              <div className="col-span-12 lg:col-span-4">
                  <CustomerSatisfaction rating={data.averageRating}/>
              </div>
             

        </div>

    ) 
  } catch (error) {
    throw new Error(error)
  }
 

}