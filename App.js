import tkinter as tk
from tkinter import scrolledtext
from datetime import datetime

# Үндсэн цонх
root = tk.Tk()
root.title("SPORT ZONE CHATBOT")
root.geometry("750x650")
root.configure(bg="#101827")

# Өнгө
BG = "#101827"
PANEL = "#1E293B"
BLUE = "#2563EB"
WHITE = "#FFFFFF"
GREEN = "#22C55E"

# Барааны мэдээлэл
products = {
    "Гутал": [
        "Nike Air Max - 250,000₮",
        "Adidas Ultraboost - 280,000₮",
        "Puma Sport - 190,000₮"
    ],
    "Хувцас": [
        "Nike футболк - 65,000₮",
        "Adidas өмд - 85,000₮",
        "Sport Hoodie - 120,000₮"
    ],
    "Бөмбөг": [
        "Сагсан бөмбөг - 75,000₮",
        "Хөлбөмбөг - 55,000₮",
        "Волейболын бөмбөг - 60,000₮"
    ]
}

# Гарчиг
title = tk.Label(
    root,
    text="⚡ SPORT ZONE",
    font=("Arial", 25, "bold"),
    bg=BG,
    fg=WHITE
)
title.pack(pady=10)

subtitle = tk.Label(
    root,
    text="YOUR SPORTS SHOP ASSISTANT",
    font=("Arial", 10),
    bg=BG,
    fg="#94A3B8"
)
subtitle.pack()

# Чатны хэсэг
chat = scrolledtext.ScrolledText(
    root,
    width=75,
    height=22,
    font=("Arial", 11),
    bg=PANEL,
    fg=WHITE,
    insertbackground=WHITE,
    wrap=tk.WORD,
    state="disabled"
)
chat.pack(padx=20, pady=15)

def message(sender, text):
    chat.config(state="normal")
    chat.insert(tk.END, f"\n{sender}: {text}\n")
    chat.see(tk.END)
    chat.config(state="disabled")

# Эхний мэндчилгээ
message("BOT", "Сайн байна уу! SPORT ZONE дэлгүүрт тавтай морил!")
message("BOT", "Би танд спортын бараа сонгоход тусална.")

# Бараа харуулах
def show_products(category):
    message("BOT", f"--- {category} ---")
    for item in products[category]:
        message("BOT", "• " + item)

# Хямдрал
def discount():
    message("BOT", "🔥 ӨНӨӨДРИЙН ХЯМДРАЛ!")
    message("BOT", "Nike футболк - 65,000₮ → 50,000₮")
    message("BOT", "Сагсан бөмбөг - 75,000₮ → 60,000₮")

# Захиалга
def order():
    message("BOT", "Захиалга өгөхийн тулд доорх хэсэгт барааны нэрээ бичнэ үү.")

# Холбоо барих
def contact():
    message("BOT", "📞 Утас: 99112233")
    message("BOT", "📍 Байршил: Улаанбаатар хот")
    message("BOT", "🕒 Ажиллах цаг: 09:00 - 21:00")

# Хэрэглэгчийн бичсэн мессеж
def send_message():
    text = entry.get().strip()

    if text == "":
        return

    message("YOU", text)
    entry.delete(0, tk.END)

    lower = text.lower()

    if "сайн" in lower or "сайн уу" in lower:
        reply = "Сайн байна уу! Танд юугаар туслах вэ?"

    elif "гутал" in lower:
        show_products("Гутал")
        return

    elif "хувцас" in lower:
        show_products("Хувцас")
        return

    elif "бөмбөг" in lower:
        show_products("Бөмбөг")
        return

    elif "хямдрал" in lower:
        discount()
        return

    elif "захиалга" in lower:
        order()
        return

    elif "холбоо" in lower:
        contact()
        return

    elif "баярлалаа" in lower:
        reply = "Баярлалаа! Манай дэлгүүрээр үйлчлүүлээрэй."

    else:
        reply = "Уучлаарай, таны хүсэлтийг ойлгосонгүй. Товчлууруудаас сонгоно уу."

    message("BOT", reply)


# Товчлуурын хэсэг
buttons = tk.Frame(root, bg=BG)
buttons.pack(pady=5)

def create_button(text, command):
    tk.Button(
        buttons,
        text=text,
        command=command,
        bg=BLUE,
        fg=WHITE,
        font=("Arial", 10, "bold"),
        width=14,
        height=2,
        relief="flat",
        cursor="hand2"
    ).pack(side="left", padx=4)

create_button("👟 Гутал", lambda: show_products("Гутал"))
create_button("👕 Хувцас", lambda: show_products("Хувцас"))
create_button("⚽ Бөмбөг", lambda: show_products("Бөмбөг"))
create_button("🔥 Хямдрал", discount)
create_button("📞 Холбоо", contact)

# Бичих хэсэг
bottom = tk.Frame(root, bg=BG)
bottom.pack(fill="x", padx=20, pady=15)

entry = tk.Entry(
    bottom,
    font=("Arial", 13),
    bg=PANEL,
    fg=WHITE,
    insertbackground=WHITE
)
entry.pack(side="left", fill="x", expand=True, ipady=10)

send = tk.Button(
    bottom,
    text="SEND ➤",
    bg=GREEN,
    fg=WHITE,
    font=("Arial", 11, "bold"),
    command=send_message
)
send.pack(side="right", padx=8, ipady=7)

entry.bind("<Return>", lambda event: send_message())

root.mainloop()
