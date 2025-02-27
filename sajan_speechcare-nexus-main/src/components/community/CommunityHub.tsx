
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Users,
  MessageSquare,
  Star,
  Calendar,
  Share2
} from "lucide-react";

export const CommunityHub = () => {
  const [activeTab, setActiveTab] = useState<'forum' | 'stories' | 'tips' | 'groups'>('forum');

  const demoContent = {
    forum: [
      { id: 1, title: "Speech Exercise Tips", author: "John D.", replies: 12 },
      { id: 2, title: "Progress Sharing", author: "Sarah M.", replies: 8 },
    ],
    stories: [
      { id: 1, title: "My Journey to Clear Speech", author: "Mike R." },
      { id: 2, title: "6 Months of Progress", author: "Emma L." },
    ],
    tips: [
      { id: 1, content: "Practice in front of a mirror", author: "Dr. Smith" },
      { id: 2, content: "Record your daily exercises", author: "Lisa T." },
    ],
    groups: [
      { id: 1, name: "Pronunciation Practice", members: 24, nextSession: "Tomorrow" },
      { id: 2, name: "Weekly Support Group", members: 18, nextSession: "Friday" },
    ]
  };

  const handleNewPost = () => {
    toast.success("Post shared with the community!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={activeTab === 'forum' ? 'default' : 'outline'}
          onClick={() => setActiveTab('forum')}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          Forum
        </Button>
        <Button
          variant={activeTab === 'stories' ? 'default' : 'outline'}
          onClick={() => setActiveTab('stories')}
        >
          <Star className="w-4 h-4 mr-2" />
          Success Stories
        </Button>
        <Button
          variant={activeTab === 'tips' ? 'default' : 'outline'}
          onClick={() => setActiveTab('tips')}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Tips
        </Button>
        <Button
          variant={activeTab === 'groups' ? 'default' : 'outline'}
          onClick={() => setActiveTab('groups')}
        >
          <Users className="w-4 h-4 mr-2" />
          Groups
        </Button>
      </div>

      <div className="glass-card p-6 rounded-xl">
        {activeTab === 'forum' && (
          <div className="space-y-4">
            <div className="flex gap-4 mb-6">
              <Input placeholder="Search discussions..." />
              <Button onClick={handleNewPost}>New Post</Button>
            </div>
            {demoContent.forum.map(post => (
              <div key={post.id} className="p-4 border rounded-lg hover:bg-accent/5">
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-muted-foreground">
                  By {post.author} · {post.replies} replies
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="space-y-4">
            {demoContent.stories.map(story => (
              <div key={story.id} className="p-4 border rounded-lg hover:bg-accent/5">
                <h3 className="font-semibold">{story.title}</h3>
                <p className="text-sm text-muted-foreground">By {story.author}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-4">
            <Textarea placeholder="Share your tip with the community..." />
            <Button onClick={() => toast.success("Tip shared successfully!")}>
              Share Tip
            </Button>
            {demoContent.tips.map(tip => (
              <div key={tip.id} className="p-4 border rounded-lg hover:bg-accent/5">
                <p className="mb-2">{tip.content}</p>
                <p className="text-sm text-muted-foreground">Shared by {tip.author}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'groups' && (
          <div className="space-y-4">
            {demoContent.groups.map(group => (
              <div key={group.id} className="p-4 border rounded-lg hover:bg-accent/5">
                <h3 className="font-semibold">{group.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {group.members} members · Next session: {group.nextSession}
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Join Session
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
