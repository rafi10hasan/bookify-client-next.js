import { PencilIcon, PenIcon, Plus, Trash, Trash2 } from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function CategoryForm({ categories, onDelete, onEdit, onCreate , onSubCreate , onSubEdit , onSubDelete }) {
  return (

    <div className="container mx-auto p-4 w-5/6">
      <Button onClick = {onCreate} className="text-sm font-bold mb-6 mx-4">
           Add Category
        <Plus />
      </Button>

      <div className="container mx-auto p-4">
        <div className="overflow-x-auto shadow-md rounded-lg bg-slate-50">
          <Table className="">
            {/* Table Header */}
            <TableHeader>
              <TableRow>
                <TableHead className="px-6 py-4">category title</TableHead>
                <TableHead className="px-6 py-4 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {categories?.map((category) => (
                <TableRow key={category._id} className="w-full">
                  {/* Parent Category Row */}
                  <TableCell colSpan={6} className="px-6 py-4">
                    <div className="flex justify-between items-first">
                      {/* Accordion for Parent and Subcategories */}
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={category._id}>
                          <AccordionTrigger className="font-medium text-gray-900 w-full">
                            <span> {category.title}</span>
                          </AccordionTrigger>
                          <AccordionContent className="mt-2 ">
                            {category.subcategories.length > 0 ? (
                              <ul className="space-y-2">
                                {category.subcategories.map((sub) => (
                                  <li
                                    key={sub._id}
                                    className="flex justify-between items-center w-full bg-gray-100 p-3 rounded-lg shadow-sm"
                                  >
                                    <span>{sub.title}</span>
                                    <div className="flex space-x-3">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onSubEdit(category._id,sub._id)}
                                      >
                                        <PenIcon />
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => onSubDelete(sub._id)}
                                      >
                                        <Trash />
                                      </Button>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-500">No subcategories available</p>
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      {/* Fixed Parent Actions */}
                    </div>

                    <div className="flex gap-4 h-12 py-4">
                      <Button
                        variant="cyan"
                        size="sm"
                        onClick={() => onSubCreate(category._id)}
                      >
                        Add SubCategory <Plus/>
                      </Button>

                      <Button
                        variant="yellow"
                        size="sm"
                        onClick={() => onEdit(category._id)}
                      >
                        Edit <PencilIcon />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onDelete(category._id)}
                      >
                        Delete <Trash2 />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
