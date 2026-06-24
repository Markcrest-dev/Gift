export default function GiftPlaceholder({ name }: { name: string }) {
    const firstLetter = (name || '?').charAt(0).toUpperCase();
    
    return (
        <div className="flex items-center justify-center w-[80px] h-[80px] bg-[#2A2420] border border-[#B8922A] rounded-sm">
            <span className="font-mono text-[28px] text-[#B8922A] leading-none select-none">
                {firstLetter}
            </span>
        </div>
    );
}
