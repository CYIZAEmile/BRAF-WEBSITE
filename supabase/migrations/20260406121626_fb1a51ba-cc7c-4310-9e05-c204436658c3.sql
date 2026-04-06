
CREATE TABLE public.quiz_enquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  talent_result TEXT NOT NULL,
  answers TEXT[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.quiz_enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit an enquiry (no auth required)
CREATE POLICY "Anyone can submit enquiries"
ON public.quiz_enquiries
FOR INSERT
WITH CHECK (true);

-- Only authenticated admin users could read enquiries in the future
CREATE POLICY "No public read access"
ON public.quiz_enquiries
FOR SELECT
USING (false);
