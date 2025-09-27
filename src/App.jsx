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
      onClick={() => setShowCalendar(false)}
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

    {/* Бутон назад към календара */}
    <button
      onClick={() => setSelectedDate(null)}
      className="mt-4 w-full bg-gray-300 text-gray-700 py-2 rounded-xl hover:bg-gray-400 transition"
    >
      ⬅ Назад към календара
    </button>

    {/* Запази и затвори */}
    <button
      onClick={() => setShowCalendar(false)}
      className="mt-2 w-full bg-pink-500 text-white py-2 rounded-xl hover:bg-pink-600 transition"
    >
      ✅ Запази и затвори
    </button>
  </div>
)}
