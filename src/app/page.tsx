export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <h1>Todo</h1>
      <div className="flex flex-row w-full max-w-lg gap-2">
        <input
          type="text"
          placeholder="Type new todo"
          className="input input-bordered w-full"
        />
        <button className="btn btn-primary">Add</button>
      </div>
    </main>
  );
}
