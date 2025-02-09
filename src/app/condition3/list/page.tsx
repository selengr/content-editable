
import ConditionList from "@/templates/condition/pagecalc/ConditionList"


let dataList =  {
    condition : [
        {
            elseQuestionId : "",
            returnQuestionId : "{#q_1403}@تاریخ.........سیبیس",
            subConditions : [
                {
                    conditionType: "#lenGraterThanText@طول متن بیشتر از",
                    id : "b1f5e17a-d1bc-41ba-8601-1b75239f322b",
                    logicalOperator : "",
                    operatorType : "VALUE@ارزش",
                    questionType : "TEXT_FIELD*{#q_101}@متی",
                    value : "55"
                }
            
            ]
        }
    ]
}


export default async function Calculator({ params }: { params: { id: string } }) {



    return (
        <div className="container mx-auto py-8 flex justify-center items-center h-screen bg-white">
            <ConditionList conditions={dataList.condition} />
        </div>
    )
}