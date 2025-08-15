import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbSeparator 
} from "../ui/breadcrumb"

export const Breadcrumbs = () => {
  return (
    <Breadcrumb>  
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <span className="text-gray-500 text-sm md:text-base">Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <span className="text-black text-sm md:text-base">Cocktails</span>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}