'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { useToast } from '@/hooks/use-toast'
import { useAddCandidate, useCandidate, useUpdateCandidate } from '@/hooks/useCandidates'

const emptyCandidate = {
    id: '',
    name: '',
    email: '',
    skills: [],
    experience: '',
    location: '',
    status: '',
    department: '',
}

export function CandidateDrawer({ isOpen, onClose, candidateId }) {
    const { toast } = useToast()
    const [candidate, setCandidate] = useState(emptyCandidate)
    const isNewCandidate = !candidateId

    const { data: candidateInfo, isLoading } = useCandidate(candidateId);
    const { mutate: addCandidate } = useAddCandidate()
    const { mutate: updateCandidate } = useUpdateCandidate()

    useEffect(() => {
        if (candidateInfo) {
            // Fetch candidate data if editing an existing candidate
            // This is a mock fetch, replace with actual API call
            setCandidate(candidateInfo)
        } else {
            setCandidate(emptyCandidate)
        }
    }, [candidateInfo])
    console.log(candidate);

    if (isLoading) return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="sm:max-w-[540px]">
                <SheetHeader>
                    <SheetTitle>Loading...</SheetTitle>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )

    const handleChange = (e) => {
        setCandidate({ ...candidate, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Here you would typically send the data to your backend API
        // For this example, we'll just show a success message

        if (isNewCandidate) {
            addCandidate(candidate, {
                onSuccess: () => {
                    toast({
                        title: "Candidate Added",
                        description: `${candidate.name} has been successfully added to the database.`,
                    })
                    onClose()
                }
            })
        } else {
            updateCandidate({ id: candidate._id, updatedCandidate: candidate }, {
                onSuccess: () => {
                    toast({
                        title: "Candidate Updated",
                        description: `${candidate.name} has been successfully updated in the database.`,
                    })
                    onClose()
                }
            })
        }
    }


    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="sm:max-w-[540px]">
                <SheetHeader>
                    <SheetTitle>{isNewCandidate ? 'Add New Candidate' : 'Edit Candidate'}</SheetTitle>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={candidate.name} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={candidate.email} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="skills">Skills</Label>
                            <Input id="skills" name="skills" value={candidate.skills} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="experience">Years of Experience</Label>
                            <Input id="experience" name="experience" value={candidate.experience} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" name="location" value={candidate.location} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Input id="status" name="status" value={candidate.status} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Input id="department" name="department" value={candidate.department} onChange={handleChange} required />
                        </div>
                    </div>
                    <SheetFooter>
                        <Button type="submit">{isNewCandidate ? 'Add Candidate' : 'Update Candidate'}</Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}