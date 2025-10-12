// app/fruitpick/page.tsx
import { redirect } from "next/navigation";

export default function FruitPickIndex() {
  // Altijd direct naar de selectie-stap
  redirect("/fruitpick/select");
}
