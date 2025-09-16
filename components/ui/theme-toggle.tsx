"use client"
import { Moon, Sun } from "@/components/ui/icons"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="button-press focus-ring">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="button-press focus-ring">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="scale-in">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`transition-colors duration-200 hover:bg-muted focus:bg-muted ${
            theme === "light" ? "bg-muted font-medium" : ""
          }`}
        >
          <Sun className="w-4 h-4 mr-2" />
          Light Theme
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`transition-colors duration-200 hover:bg-muted focus:bg-muted ${
            theme === "dark" ? "bg-muted font-medium" : ""
          }`}
        >
          <Moon className="w-4 h-4 mr-2" />
          Dark Theme
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
