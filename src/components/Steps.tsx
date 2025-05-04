type StepsProps = {
  steps: string[];
  currentStep: number;
};

export function Steps({ steps, currentStep }: StepsProps) {
  return (
    <div className="flex items-center w-full mb-10">
      {steps.map((index) => {
        const isActive =
          currentStep === Number(index) || currentStep > Number(index);
        return (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  isActive ? "bg-blue-500" : "border border-white/20"
                }`}
              ></div>
            </div>
            {Number(index) !== steps.length && (
              <div className="h-[1px] w-10 bg-white/10 mx-2 relative overflow-hidden">
                <div
                  className={`h-full ${
                    currentStep > Number(index) ? "bg-blue-500" : "bg-white/20"
                  }`}
                  style={{ width: "100%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
