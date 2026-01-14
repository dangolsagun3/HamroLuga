'use client'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { EditIcon, RefreshCcwIcon, Trash, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { toast } from "sonner"



interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface DeleteDialogProps {
  item: Product;
}

export function DeleteDialog({ item }: DeleteDialogProps) {

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    const {data} =   await axios.delete("https://fakestoreapi.com/products/" + item.id
       );
      if(data) {
        toast("products deleted successfully!")
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline"><Trash2/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Product??</DialogTitle>
            <DialogDescription>
            Are you sure you want to delete this product?
            </DialogDescription>
          </DialogHeader>
    
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button  onClick={handleDelete} className="bg-red-700" type="submit">Confirm Delete</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}



interface ProductDialogProps {
  action?: 'edit' | 'add';
  item?: Product;
}

export function ProductDialog({ action = 'add', item }: ProductDialogProps) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
      {action === 'edit' ? <EditIcon/> :  <Button  className="mb-4 ml-4 bg-green-800">Add Products</Button>}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
      {action === 'edit'  ?     <DialogTitle> Edit Products</DialogTitle>:   <DialogTitle> Add Products</DialogTitle>}
            <DialogDescription>
            {action === 'edit'  ?    'Edit product' : 'Add new product '}
            </DialogDescription>
          </DialogHeader>
          <ProfileForm  setOpen={setOpen} item={item}/>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
      <Button  className="mb-4 ml-4 bg-green-800">Add Products</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

interface ProfileFormProps {
  setOpen?: (open: boolean) => void;
  item?: Product;
  className?: string;
}

interface FormDataState {
  title: string;
  price: string | number;
  description: string;
  category: string;
  image: string;
}

function ProfileForm({ item, setOpen, className }: ProfileFormProps) {
  const [formData, setFormData] = useState<FormDataState>(item || {
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev: FormDataState) => ({ ...prev, [id]: value }));
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    const {data} =   await axios.put("https://fakestoreapi.com/products/" + item?.id, 
        formData
       );
      if(data) {
        toast("products updated successfully!")
        setOpen?.(false);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    }
  };


  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    const {data} =   await axios.post("https://fakestoreapi.com/products", 
        formData
       );
      if(data) {
        toast("products added successfully!")
        setOpen?.(false);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product.");
    }
  };
  return (
    <form onSubmit={item ? handleEdit : handlePost} className={cn("grid items-start gap-6", className)}>
      <div className="grid gap-3">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter product title"
          required
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter product price"
          step="0.01"
          required
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
          className="border rounded-md p-2"
          rows={4}
          required
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="category">Category</Label>
        <Input
          type="text"
          id="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Enter product category"
          required
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="image">Image URL</Label>
        <Input
          type="url"
          id="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Enter product image URL"
          required
        />
      </div>
      <Button type="submit" className="bg-green-600 text-white">
      {item ? 'Edit Product' : ' Add Product'}
      </Button>
    </form>
  );
}


export default function TableDemo() {
  const [products, setProducts] = useState<Product[]>([])
  const fetchdata = async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    const data: Product[] = await res.json()
    setProducts(data)
  }

  //this will run only once when the component is mounted
   useEffect(()=>{
    fetchdata()
   },[])


  return (
    <div>
        <ProductDialog/>
      <Button onClick={fetchdata} className="mb-4 bg-white text-black"><RefreshCcwIcon/></Button>

<Table>
      <TableCaption>A list of your products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Product name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Category</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.title}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell className="text-right">{item.category}</TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
              <DeleteDialog item={item}/>

              <ProductDialog action="edit" item={item}/>
              </div>
         </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>

    </div>
 
  )
}
