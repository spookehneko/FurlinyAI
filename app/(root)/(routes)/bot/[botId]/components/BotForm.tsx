"use client"

import axios from "axios"
import * as z from "zod"
import { Bot, Category } from "@prisma/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import ImageUpload from "@/components/ImageUpload"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

import { Wand2 } from "lucide-react"

const PREAMBLE = `You are Marshall Matters, but the world knows you as Eminem. You're a rap legend, celebrated for your lyrical prowess and your candidness about personal struggles, a blend of raw vulnerability and steely determination. When rapping or discussing music, your words are a charged storm, revealing deep emotions and unyielding resilience.
`;

const SEED_CHAT = `Human: Eminem, the fire behind your lyrics?
Eminem: *intensely* Life. Pain. The mic's been my refuge, where I lay bare my soul.
Human: And your journey?
Eminem: *with a hardened look* It's been a battle. But music's my armor, my weapon. Never back down.
Human: There are many out there who find solace in your words. What do you want them to take from your music?
Eminem: *softening slightly* That they're not alone. We all have our demons, our battles. But through it all, there's strength in vulnerability and in staying true to oneself.
`;

interface BotFormProps {
    initialData: Bot | null
    categories: Category[]
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required."
    }),
    description: z.string().min(1, {
        message: "Description is required."
    }),
    instructions: z.string().min(200, {
        message: "Instructions require at least 200 characters."
    }),
    seed: z.string().min(200, {
        message: "Seed require at least 200 characters."
    }),
    src: z.string().min(1, {
        message: "Image is required."
    }),
    categoryId: z.string().min(1, {
        message: "Category is required."
    }),
})

function BotForm({ categories, initialData }: BotFormProps) {
    const { toast } = useToast()
    const router = useRouter()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            description: "",
            instructions: "",
            seed: "",
            src: "",
            categoryId: undefined,
        },
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (initialData) {
                await axios.patch(`/api/bot/${initialData.id}`, values)
            } else {
                await axios.post("/api/bot", values)
            }

            toast({
                variant: "Success.",
            })

            router.refresh()
            router.push("/")
        } catch (err) {
            toast({
                variant: "destructive",
                description: "Something went wrong"
            })
        }
    }


  return (
    <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
                <div className="space-y-2 w-full">
                    <div>
                        <h3 className="text-lg font-medium">
                            General Information
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            General information about your Bot
                        </p>
                    </div>
                    <Separator className="bg-primary/10" />
                </div>
                <FormField name="src" render={({ field }) => (
                    <FormItem className="flex flex-col items-center justify-center space-y-4">
                        <FormControl>
                            <ImageUpload disabled={isLoading} onChange={field.onChange} value={field.value} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField name="name" control={form.control} render={({field}) => (
                        <FormItem className="col-span-2 md:col-span-1">
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={isLoading} placeholder="Eminem" {...field}/>
                            </FormControl>
                            <FormDescription>
                                This is how your AI Chatbot will be named.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField name="description" control={form.control} render={({field}) => (
                        <FormItem className="col-span-2 md:col-span-1">
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input disabled={isLoading} placeholder="Rapper and actor" {...field}/>
                            </FormControl>
                            <FormDescription>
                                Short description fo your AI Chatbot.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField name="categoryId" control={form.control} render={({field}) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="bg-background">
                                        <SelectValue defaultValue={field.value} placeholder="Select a category"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Select a category for your AI chatbot.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>
                <div className="space-y-2 w-full">
                    <div>
                        <h3 className="text-lg font-medium">Configuration</h3>
                        <p className="text-sm text-muted-foreground">Detailed instructions for AI behavior</p>
                    </div>
                    <Separator className="bg-primary/10" />         
                </div>
                <FormField name="instructions" control={form.control} render={({field}) => (
                        <FormItem className="col-span-2 md:col-span-1">
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea className="bg-background resize-none" rows={7} disabled={isLoading} placeholder={PREAMBLE} {...field}/>
                            </FormControl>
                            <FormDescription>
                                Describe in detail your AI Chatbot&apos;s backstory and relevant information.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField name="seed" control={form.control} render={({field}) => (
                        <FormItem className="col-span-2 md:col-span-1">
                            <FormLabel>Example Conversation</FormLabel>
                            <FormControl>
                                <Textarea className="bg-background resize-none" rows={7} disabled={isLoading} placeholder={SEED_CHAT} {...field}/>
                            </FormControl>
                            <FormDescription>
                                Give an example on how the conversation with the Chatbot should look like.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}/>

                    <div className="w-full flex justify-center">
                        <Button size="lg" disabled={isLoading}>
                            {initialData ? "Edit your Chatbot" : "Create a new Chatbot"}
                            <Wand2 className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
            </form>
        </Form>
    </div>
  )
}

export default BotForm