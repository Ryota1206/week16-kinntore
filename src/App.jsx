import React, { useState } from "react";

const App = () => {
  const [records, setRecords] = useState([]);
  const [date, setDate] = useState("");
  const [menu, setMenu] = useState("");
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const [competitionDate, setCompetitionDate] = useState("");

  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  const getDaysToCompetition = () => {
    if (!competitionDate) return "-";
    const comp = new Date(competitionDate);
    const diffMs = comp.getTime() - today.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? diffDays : "終了";
  };

  const handleAddRecord = (e) => {
    e.preventDefault();
    if (!date || !menu || !weight || !reps) return;

    const newRecord = {
      id: records.length + 1,
      date,
      menu,
      weight: Number(weight),
      reps: Number(reps),
    };

    setRecords([newRecord, ...records]);
    setDate("");
    setMenu("");
    setWeight("");
    setReps("");
  };

  return (
    <div style={styles.app}>
      <h1 style={styles.title}>🔥 筋トレ記録アプリ</h1>

      {/* 今日の日付カード */}
      <div style={styles.dateCard}>
        <p style={styles.dateLabel}>TODAY</p>
        <p style={styles.dateValue}>{todayStr}</p>
      </div>

      {/* 大会カウントダウン */}
      <div style={styles.section}>
        <h2 style={styles.heading}>🏆 大会カウントダウン</h2>
        <div style={styles.countdownCard}>
          <label style={styles.label}>
            大会日：
            <input
              type="date"
              value={competitionDate}
              onChange={(e) => setCompetitionDate(e.target.value)}
              style={styles.input}
            />
          </label>
          <p style={styles.countdownText}>
            大会まで残り：  
            <span style={styles.countdownNumber}>{getDaysToCompetition()}</span> 日
          </p>
        </div>
      </div>

      {/* 新規記録フォーム */}
      <div style={styles.section}>
        <h2 style={styles.heading}>📘 新しい記録を追加</h2>
        <form onSubmit={handleAddRecord} style={styles.form}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="日付"
            style={styles.input}
          />
          <input
            type="text"
            value={menu}
            onChange={(e) => setMenu(e.target.value)}
            placeholder="メニュー名（例：ベンチプレス）"
            style={styles.input}
          />
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="重量(kg)"
            style={styles.input}
          />
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="回数"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>記録を追加</button>
        </form>
      </div>

      {/* 過去の記録 */}
      <div style={styles.section}>
        <h2 style={styles.heading}>📚 過去の記録</h2>

        {records.length === 0 ? (
          <p style={styles.noRecord}>まだ記録がありません。</p>
        ) : (
          <div style={styles.recordList}>
            {records.map((r) => (
              <div key={r.id} style={styles.recordCard}>
                <p style={styles.recordDate}>{r.date}</p>
                <p style={styles.recordMenu}>{r.menu}</p>
                <p style={styles.recordDetail}>
                  {r.weight}kg × {r.reps}回
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  app: {
    backgroundColor: "#0d0d0d",
    color: "#fff",
    minHeight: "100vh",
    padding: "32px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "24px",
    color: "#ff3b3b",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "12px",
    borderLeft: "6px solid #ff3b3b",
    paddingLeft: "12px",
  },
  section: {
    marginBottom: "40px",
  },
  dateCard: {
    backgroundColor: "#1a1a1a",
    padding: "16px 24px",
    borderRadius: "10px",
    display: "inline-block",
    marginBottom: "24px",
    border: "2px solid #ff3b3b",
  },
  dateLabel: {
    fontSize: "14px",
    color: "#ff7b7b",
  },
  dateValue: {
    fontSize: "28px",
    fontWeight: "bold",
  },
  countdownCard: {
    backgroundColor: "#1a1a1a",
    padding: "20px",
    borderRadius: "10px",
    border: "2px solid #ff3b3b",
    maxWidth: "350px",
  },
  countdownText: {
    marginTop: "12px",
    fontSize: "18px",
  },
  countdownNumber: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#ff3b3b",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxWidth: "350px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#222",
    color: "#fff",
  },
  button: {
    padding: "12px",
    backgroundColor: "#ff3b3b",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.2s",
  },
  buttonHover: {
    backgroundColor: "#ff5c5c",
  },
  recordList: {
    display: "grid",
    gap: "16px",
  },
  recordCard: {
    backgroundColor: "#1a1a1a",
    padding: "16px",
    borderRadius: "10px",
    border: "1px solid #333",
    transition: "0.2s",
  },
  recordCardHover: {
    transform: "scale(1.02)",
  },
  recordDate: {
    fontSize: "14px",
    color: "#bbb",
  },
  recordMenu: {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "4px",
  },
  recordDetail: {
    marginTop: "6px",
    fontSize: "16px",
    color: "#ff7b7b",
  },
  noRecord: {
    color: "#aaa",
  },
};

export default App;
