export default function CompletionBar({ completed, total = 5 }) {
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div className="flex items-center gap-2">
       <span className="text-sm text-gray-700 ">{`${completed}/${total} completed`}</span>
       <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
      <div
      
        className="h-full bg-green-500 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <span className="text-sm text-gray-700">🎉</span>
   
    </div>
  );
}