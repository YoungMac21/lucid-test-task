'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAutocomplete } from "@/hooks/useAutocomplete";
import { useStore } from "@/lib/useStore";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  const {input, trimInput, setInput, setTrimInput} = useStore()
  const [left, setLeft] = useState(0)
  const response = useAutocomplete(input)
  const widthRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (widthRef.current && left != widthRef.current.offsetWidth) {
      setLeft(widthRef.current.offsetWidth)
    }
  }, [widthRef.current?.offsetWidth])

  function onChange (e: ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value)
  }
  
  function onSelect () {
    if (inputRef.current?.selectionStart) {
      setTrimInput(input.slice(0, inputRef.current?.selectionStart))
    } else {
      setTrimInput(input)
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <div className="relative w-full max-w-xl m-auto">
          <Input
            ref={inputRef}
            value = {input}
            onChange = {onChange}
            onSelect = {onSelect}
            placeholder="Type a formula..."
          />
          <div className="relative flex">
            <div ref={widthRef} className="invisible relative h-9 min-w-0 pl-3 py-1 text-base file:h-7 file:text-sm file:font-medium md:text-sm fixed whitespace-pre-wrap">
              {trimInput}
              </div>
            {!response.isLoading && input.length > 1 &&
              <Card className="py-[12px] absolute w-[280px]" style={{left}}>
                <CardContent className="px-[12px] flex flex-col max-h-[300px] overflow-scroll gap-[4px]">
                  {response.data?.map((item: any, index: number) => {
                    return (
                      <Button key={index}>
                        {item.name}
                      </Button>
                    )
                  })}
                </CardContent>
              </Card>
            }
          </div>
        </div>
        
      </main>
    </div>
  );
}
