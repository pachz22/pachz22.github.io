"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

const PRODUCT_NAME = "Gym Client"
const PRODUCT_PRICE = 1500 // $15.00 in cents

export default function Home() {
  const [isRedeemDialogOpen, setIsRedeemDialogOpen] = useState(false)
  const [couponCode, setCouponCode] = useState("")

  const handleBuyNow = () => {
    // Redirect to PayPal
    window.location.href = "https://www.paypal.com/paypalme/Pachz22?country.x=AR&locale.x=es_XC"
  }

  const handleRedeemCoupon = async () => {
    try {
      const response = await fetch("/api/redeem-coupon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ couponCode }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Coupon redeemed successfully!",
          description: "Your purchase is complete.",
        })
        setIsRedeemDialogOpen(false)
      } else {
        toast({
          title: "Error redeeming coupon",
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center py-10"
      style={{
        backgroundImage:
          "url('https://cdn.discordapp.com/attachments/1332177402478071950/1333656456855289866/image.png?ex=679f9e9d&is=679e4d1d&hm=b4e522739149b0e793564dfd128a0896479ea745a5942064f386df5790bd237f&')",
      }}
    >
      <div className="bg-black bg-opacity-80 p-8 rounded-xl shadow-lg max-w-2xl w-full text-white backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-4">{PRODUCT_NAME}</h1>
        <p className="text-4xl font-bold text-green-500 mb-4">$15.00 USD</p>
        <p className="mb-4">
          Gym Client, uno de los mejores clientes para pvp y utilidades en el mercado, compralo a tan solo 15 dólares.
        </p>
        <img
          src="https://cdn.discordapp.com/attachments/1332177402478071950/1333625876809515031/image.png?ex=67a02ae2&is=679ed962&hm=0ec3af39d40d02f7f80ccce07278ba673a613e69aa263b60a791149103108986&"
          alt={PRODUCT_NAME}
          className="w-full max-w-md rounded-lg shadow-md mb-6 transition-transform hover:scale-105"
        />
        <h2 className="text-xl font-semibold mb-2">Características:</h2>
        <ul className="list-none pl-0 mb-6">
          {["Combat", "Player", "Render", "Movement", "Misc"].map((feature, index) => (
            <li key={index} className="bg-white bg-opacity-10 p-2 rounded mb-2 flex items-center">
              <span className="text-green-500 mr-2">✓</span> {feature}
            </li>
          ))}
        </ul>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleBuyNow} className="w-full sm:w-auto">
            Comprar Ahora
          </Button>
          <Dialog open={isRedeemDialogOpen} onOpenChange={setIsRedeemDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto bg-black text-white hover:bg-gray-800">
                Canjear Cupón
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Canjear Cupón</DialogTitle>
                <DialogDescription>Ingresa tu código de cupón para canjearlo.</DialogDescription>
              </DialogHeader>
              <Input
                placeholder="XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button onClick={handleRedeemCoupon}>Canjear</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mt-12 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Developers</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            {
              name: "PachecoZzZz",
              image:
                "https://cdn.discordapp.com/attachments/1333598441145761804/1335450001668833290/badfula.png?ex=67a0363b&is=679ee4bb&hm=36022303ac92967987aa9ac2b11de51a837ee8eb3d76435dac64bc6e2b4ed3cf&",
            },
            {
              name: "c1q_",
              image:
                "https://cdn.discordapp.com/attachments/1333598441145761804/1335450001295282299/c1q.png?ex=67a0363b&is=679ee4bb&hm=897156bca7a5901aed9f8517f2acd1bb02e9e6f17b396507252fbafa8f19a316&",
            },
            {
              name: "AfricanWalmart",
              image:
                "https://cdn.discordapp.com/attachments/1333598441145761804/1335450001060528160/descarga_1.png?ex=67a0363b&is=679ee4bb&hm=36f045652841affa81654160d88b8455ae424312332deb8812c7fa70ea6497b2&",
            },
          ].map((dev, index) => (
            <div key={index} className="text-center">
              <p className="font-bold mb-2 select-none">{dev.name}</p>
              <img src={dev.image || "/placeholder.svg"} alt={dev.name} className="w-64 h-80 rounded shadow-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

