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

const EXPERIENCE_LEVELS = Array.from({ length: 30 }, (_, i) => (i + 1).toString());

// Form schema and type definition
const formSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  linkedin: z.string().url("Please enter a valid LinkedIn URL")
    .refine(url => url.startsWith('https://linkedin.com/') || url.startsWith('https://www.linkedin.com/'), {
      message: "Must be a valid LinkedIn URL"
    }),
  resume_link: z.string().url("Please enter a valid URL to your resume"),
  additional_links: z.object({
    github: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    portfolio: z.string().url("Must be a valid URL").optional().or(z.literal('')),
    other: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  }),
  location: z.string().min(2, "Location is required"),
  description: z.string().min(50, "Please provide a detailed description (at least 50 characters)"),
  current_company: z.string().optional(),
  experience: z.string().min(1, "Please select your years of experience"),
  skills: z.string().min(1, "Please enter at least one skill"),
});

// Infer the form values type from the schema
type FormValues = z.infer<typeof formSchema>;

export default function Jobs() {
  const router = useRouter();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: "",
      linkedin: "",
      resume_link: "",
      additional_links: {
        github: "",
        portfolio: "",
        other: ""
      },
      location: "",
      description: "",
      current_company: "",
      experience: "",
      skills: "",
    },
  });
  
  const { control, handleSubmit } = form;

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      // Filter out empty additional links
      const additionalLinks: Record<string, string> = {};
      if (values.additional_links.github) additionalLinks.github = values.additional_links.github;
      if (values.additional_links.portfolio) additionalLinks.portfolio = values.additional_links.portfolio;
      if (values.additional_links.other) additionalLinks.other = values.additional_links.other;

      // Process skills string into array and clean up whitespace
      const skillsArray = values.skills
        .split(',')
        .map(skill => skill.trim())
        .filter(skill => skill.length > 0);

      const talentData = {
        name: values.name,
        linkedin: values.linkedin,
        resume_link: values.resume_link,
        additional_links: Object.keys(additionalLinks).length > 0 ? additionalLinks : null,
        location: values.location,
        description: values.description,
        current_company: values.current_company || null,
        experience: parseInt(values.experience, 10),
        skills: skillsArray,
      };

      console.log('Submitting talent data:', talentData);
      
      const { data, error } = await supabase
        .from('talents')
        .insert([talentData])
        .select();
      
      if (error) throw error;

      toast.success("Thank you for your application! We'll review your profile and get back to you soon.");
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("There was an error submitting your application. Please try again.");
    }
  };

  return (
    <div className="mx-auto flex grow flex-col gap-y-6 px-4 overflow-x-hidden py-8 sm:py-12">
      <section className="max-w-3xl mx-auto w-full">
        <div className="text-center mt-8 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-serif">Join the next breakout startup</h1>
          <p className="text-muted-foreground md:w-[75%] mx-auto">
            Get matched with founders building the future. Superfounder’s AI recommends you directly to early-stage startups looking for exceptional talent.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit(onSubmit)(e);
          }} className="space-y-6 px-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile *</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resume_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume/CV Link *</FormLabel>
                    <FormControl>
                      <Input placeholder="https://drive.google.com/file/d/...." {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      Upload your resume to Google Drive, Dropbox, or similar and share the link
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="current_company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Where do you currently work?" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input placeholder="City, Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select years of experience" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {EXPERIENCE_LEVELS.map((years) => (
                          <SelectItem key={years} value={years}>
                            {years} {years === '1' ? 'year' : 'years'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Skills *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g., JavaScript, React, Node.js, Python" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your skills separated by commas (e.g., JavaScript, React, Node.js)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Tell us about yourself *</FormLabel>
                    <FormControl>
                      <textarea
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Share your background, what you're looking for, and why you'd be a great fit for startups..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2 space-y-4">
                <h3 className="text-lg font-medium">Additional Links (Optional)</h3>
                
                <FormField
                  control={form.control}
                  name="additional_links.github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://github.com/username" 
                          {...field} 
                          value={field.value || ''}
                          onChange={(e) => field.onChange(e.target.value || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additional_links.portfolio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Portfolio</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://yourportfolio.com" 
                          {...field} 
                          value={field.value || ''}
                          onChange={(e) => field.onChange(e.target.value || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additional_links.other"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Other (e.g., personal website, blog)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://" 
                          {...field} 
                          value={field.value || ''}
                          onChange={(e) => field.onChange(e.target.value || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="lg" className="w-full md:w-auto">
                Submit Application
              </Button>
            </div>

          </form>
        </Form>
      </section>
    </div>
  );
}
