const StatCard = ({label, value}) => {
  return (
    <div className="w-60 h-24 bg-[#1f2933] border border-gray-700 rounded-xl p-4">
        <p className="text-gray-400 text-[14px]">{label}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  )
}

export default StatCard