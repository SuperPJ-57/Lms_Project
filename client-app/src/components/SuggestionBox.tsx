
interface SuggestionBoxProps {
    suggestions: Object[];
    idKey: string;
    nameKey: string;
    onClick: (id: number,name:string) => void;
}

const SuggestionBox: React.FC<SuggestionBoxProps> = ({ suggestions,idKey,nameKey, onClick }) => {
    return (
        <div className="absolute top-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10" 
            hidden = {suggestions.length === 0}
        >
            {suggestions.map((suggestion: any) => (
                
                <div key={suggestion[idKey]} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={
                    () => onClick(suggestion[idKey],suggestion[nameKey])}
                >
                    {suggestion[nameKey]}
                </div>
            ))}
        </div>
    );
}
export default SuggestionBox;