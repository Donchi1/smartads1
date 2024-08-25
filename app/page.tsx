"use client"
import Image from "next/image";
import Text from "./components/Text";
import Layout from "./components/Layout";
import H2 from "./components/H2";
import { catogs } from "@/utils/constants";
import { useState } from "react";
import BottomTab from "./components/BottomTab";
import Card from "./components/Card";
import HomeHeader from "./components/HomeHeader";


export default function Home() {
  const [tab, setTab] = useState(false)

  return (
    <>
      <HomeHeader />
      <main className="h-[88vh]">
        <Layout innerClassName="!w-full" className="!px-0  !pt-0 !bg-main-gray">
          <div className="mb-[12vh]">
            <div className="space-y-6 mt-10">
              <div className="px-2">

                <div>
                  <H2>Where would you </H2>
                  <H2>like to travel</H2>
                </div>

                <div className="flex justify-between items-center bg-white rounded-xl  px-3">
                  <Text className="!border-r text-gray-text !text-[17px] !border-main-gray basis-[90%] py-[6px] my-[6px] lg:py-2 lg:my-2">Search for your hotel</Text>
                  <div className="basis-[10%] flex justify-center items-center">
                    <Image className="size-5" width={200} height={200} src={"/img/search.png"} alt="search" />
                  </div>

                </div>
              </div>
              <div className="grid grid-cols-4 grid-rows-subgrid gap-3">
                {catogs.map(({ img, title }) => (
                  <Card key={img}>
                    <div className="flex justify-center items-center flex-col rounded-lg gap-4 ">
                      <Image className="w-[35px] mx-w-full" width={100} height={100} src={img} alt="catog" />
                      <span className="text-[11px] lg:text-[12px] text-center">{title}</span>
                    </div>
                  </Card>

                ))}

              </div>
              <div className="bg-white rounded-t-xl rounded-b-none pb-4">
                <fieldset className="space-y-1">
                  <div className="flex items-center gap-6 p-8">
                    <div className="flex flex-col">
                      <p onClick={() => setTab(!tab)} className="cursor-pointer">
                        Popular
                      </p>

                      <span className={`inline-block w-14 h-1 ${!tab && "bg-main-color"}`}></span>
                    </div>
                    <div className="flex flex-col">
                      <p onClick={() => setTab(!tab)} className="cursor-pointer">
                        Best Price
                      </p>

                      <span className={`inline-block w-14 h-1 ${tab && "bg-main-color"}`}></span>
                    </div>

                  </div>
                  <div >
                    <Image className={`max-w-full w-full object-cover ${!tab ? "block" : "hidden"}`} width={700} height={800} src="/img/popular-hotel.png" alt="best-price-hotel" />
                    <Image className={`w-full max-w-full object-cover ${tab ? "block" : "hidden"}`} width={700} height={800} src="/img/best-price-hotel.png" alt="best-price-hotel" />
                  </div>
                </fieldset>

              </div>
            </div>
          </div>
        </Layout>
        <BottomTab />
      </main>
    </>
  );

}



