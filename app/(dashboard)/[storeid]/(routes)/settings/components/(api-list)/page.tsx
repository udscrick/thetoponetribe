"use client"
import { useOrigin } from "@/app/hooks/use-origin";
import ApiAlert from "@/components/custom/settings/api-alert/page";

interface ApiAlertProps {
    title: string;
    description: string;
    variant: "public" | "admin";
}
interface ApiListProps{
    storeid: string
}
const ApiList = ({storeid}:ApiListProps) =>{
    const originVar = useOrigin();
    const publicApis:ApiAlertProps[] = [
        {
            title: 'NEXT_PUBLIC_API_URL',
            description: `${originVar}/api/${storeid}`,
            variant: "public"
        }
    ]
    return (
        <>
        {
            publicApis.map((apiKey) => <ApiAlert title={apiKey.title} description={apiKey.description} variant={apiKey.variant} key={apiKey.description}></ApiAlert>)
        }
        </>
    )
}

export default ApiList;