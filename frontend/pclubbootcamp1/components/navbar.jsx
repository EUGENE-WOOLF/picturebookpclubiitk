export default function Nav() {
  return (
    <nav className="w-full  px-6 py-4 flex items-center justify-between ">
      {/* Logo */}
      <div className="text-xl font-bold  tracking-wide">FableFlow</div>

      {/* Account Name */}
      <div className="flex items-center space-x-3">
        <span className=" font-medium">Ujjwal Prakash</span>
        <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md">
          UP
        </div>
      </div>
    </nav>
  );
}
