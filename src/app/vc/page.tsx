"use client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner"
import { supabase } from "@/lib/supabase";

// Define enums as string arrays
const INVESTOR_TYPES = ["VC", "Angel", "Accelerator", "Syndicate"] as const;
const STAGES = ["PreSeed", "Seed", "SeriesA", "SeriesB"] as const;
const INTEREST_AREAS = [
  'AI',
  'Saas',
  'Infrastructure',
  'Consumer',
  'EnterpriseTech',
  'Agriculture',
  'Space',
  'DeepTech',
  'Robotics',
  'Healthcare',
  'FinTech',
  'Automotive',
  'EdTech',
  'Blockchain',
  'SupplyChain',
  'Entertainment',
  'CyberSecurity',
  'Climate',
  'Marketplace',
  'Research',
  'Automation',
  'Mobility',
  'SocialMedia',
  'Other'
] as const;

// Form schema and type definition
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  associatedFirm: z.string().optional(),
  investorType: z.string().min(1, "Please select an investor type"),
  stage: z.string().min(1, "Please select a stage"),
  interestAreas: z.array(z.string()).min(1, "Please select at least one area"),
  location: z.string().optional(),
  linkedinOrWebsite: z.string()
    .url("Please enter a valid URL")
    .refine(
      (url) => 
        url.startsWith('https://linkedin.com/') || 
        url.startsWith('https://www.linkedin.com/') ||
        url.startsWith('http://') || 
        url.startsWith('https://'),
      "Please enter a valid LinkedIn or website URL"
    ),
  notifyMatches: z.boolean().default(false),
});

// Infer the form values type from the schema
type FormValues = z.infer<typeof formSchema>;

export default function Vc() {
  const router = useRouter();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any, // Type assertion to handle the resolver type
    defaultValues: {
      name: "",
      associatedFirm: "",
      investorType: "",
      stage: "",
      interestAreas: [],
      location: "",
      linkedinOrWebsite: "",
      notifyMatches: false,
    },
  });
  
  const { control, handleSubmit } = form;

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      // Prepare data for Supabase
      const investorData = {
        name: values.name,
        associated_firm: values.associatedFirm || null,
        investor_type: values.investorType,
        stage: values.stage,
        interest_areas: values.interestAreas,
        location: values.location || null,
        linkedin_or_website: values.linkedinOrWebsite,
        notify_matches: values.notifyMatches,
      };

      console.log('Form submitted:', investorData);
      
      // TODO: Uncomment and implement Supabase insert
      const
 session = 
await
 supabase.auth.getSession();
console
.log(
'session:'
, session);
      const { data, error } = await supabase
        .from('investors')
        .insert([investorData])
        .select();
      if (error) throw error;

      toast.success("Thank you for your interest! We'll recommed our founders about your profile.");
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("There was an error submitting your form. Please try again.");
    }
  };

  return (
    <div className="mx-auto flex grow flex-col gap-y-6 px-4 overflow-x-hidden py-8 sm:py-12">
      <section className="max-w-3xl mx-auto w-full">
        <div className="text-center mt-8 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-serif">Discover founders before everyone else</h1>
          <p className="text-muted-foreground  md:w-[70%] mx-auto">
            Join Superfounder's investor network and get matched with early-stage startups aligned with your thesis — powered by AI.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit(onSubmit)(e);
          }} className="space-y-6 px-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="associatedFirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firm (if applicable)</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC Ventures" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="investorType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investor Type*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select investor type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="VC">VC</SelectItem>
                        <SelectItem value="Angel">Angel Investor</SelectItem>
                        <SelectItem value="Accelerator">Accelerator</SelectItem>
                        <SelectItem value="Syndicate">Syndicate</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="stage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Investment Stage*</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select investment stage" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {STAGES.map((stage) => (
                          <SelectItem key={stage} value={stage}>
                            {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., San Francisco, Remote, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <div className="md:col-span-2">
                <FormField
                  control={control}
                  name="interestAreas"
                  render={() => (
                    <FormItem>
                      <FormLabel>Interest Areas*</FormLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {INTEREST_AREAS.map((area) => (
                          <FormField
                            key={area}
                            control={control}
                            name="interestAreas"
                            render={({ field }) => {
                              return (
                                <FormItem key={area} className="flex items-center space-x-2">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(area)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, area])
                                          : field.onChange(
                                              field.value?.filter((value) => value !== area)
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="!mt-0">{area}</FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={control}
                name="linkedinOrWebsite"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>LinkedIn Profile or Website*</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://linkedin.com/in/username or https://yourfirm.com" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Please provide either your LinkedIn profile or your firm's website
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={control}
                name="notifyMatches"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-1 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Get notified about AI-recommended matches</FormLabel>
                      <FormDescription>
                        We'll alert you when we find promising startups that match your criteria.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Join Investor Network
              </Button>
            </div>

          </form>
        </Form>
      </section>
    </div>
  );
}