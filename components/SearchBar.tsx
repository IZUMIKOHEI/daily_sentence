import { Input } from "@/components/ui/input";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface SearchBarProps {
  value: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ value, handleSearchChange }: SearchBarProps) => {
  return (
    <div className="max-container md:w-[85%] w-5/6 lg:w-6/12 mt-16">
      <Input
      type="text"
        value={value}
        onChange={handleSearchChange}
        placeholder="试着搜索一下（标签， 内容， 发布者）"
      />
    </div>
  );
};

export default SearchBar;