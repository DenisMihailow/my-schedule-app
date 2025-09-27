import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const hours = Array.from({ length: 11 }, (_, i) => `${9 + i}:00`);
const services = ["Изграждане", "Поддръжка", "Маникюр", "Педикюр"];

function App() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleServiceChange = (hour, service, price) => {
    setAppointments((prev) => ({
      ...prev,
      [hour]: { service, price },
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">График Маникюр 💅</h1>
      <p className="text-gray-700 mb-6">Управлявай лесно часовете си</p>

      {!showCalendar ? (
        <button
          onClick={() => setShowCalendar(true)}
          className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-2xl shadow hover:bg-pink-600 transition"
        >
          ➕ Добави час
        </button>
      ) : (
        <div className="bg-white rounded-2xl p-6 shadow-lg mt-4">
          {!selectedDate ? (
            <>
              <Calendar
                onClickDay={handleDateClick}
                value={new Date()}
                className="rounded-lg shadow"
              />
              <p className="text-center mt-2 text-gray-600">
                Избери дата, за да добавиш час 📅
              </p>
              <button
  onClick={() => {
    setShowCalendar(false); // връща към началния екран
    setSelectedDate(null);  // чисти избраната дата
  }}
  className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded-xl hover:bg-gray-400 transition"
>
  ⬅ Назад
</button>
            </>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold text-center mb-4">
                {selectedDate.toLocaleDateString("bg-BG")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="bg-gray-50 p-3 rounded-lg shadow-sm flex items-center justify-between"
                  >
                    <span className="font-medium">{hour}</span>
                    <select
                      className="border rounded p-1 text-sm"
                      onChange={(e) =>
                        handleServiceChange(hour, e.target.value, appointments[hour]?.price)
                      }
                    >
                      <option value="">--услуга--</option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      placeholder="Цена"
                      className="border rounded p-1 w-20 text-sm"
                      onChange={(e) =>
                        handleServiceChange(
                          hour,
                          appointments[hour]?.service,
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
              </div>

              {/* 👇 Нов бутон Назад */}
              <button
                onClick={() => setSelectedDate(null)}
                className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded-xl hover:bg-gray-400 transition"
              >
                ⬅ Назад
              </button>

              <button
                onClick={() => setShowCalendar(false)}
                className="mt-2 w-full bg-pink-500 text-white py-2 rounded-xl hover:bg-pink-600 transition"
              >
                ✅ Запази и затвори
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
