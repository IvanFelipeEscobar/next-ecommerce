'use client'

import { useState } from 'react'
import { Button } from '../ui/button'

const Comment = ({ comment }: { comment: string }) => {
  const [expandedComment, setExpandedComment] = useState(false)
  const longText = comment.length > 130
  const displayComment =
    longText && !expandedComment ? `${comment.slice(0, 130)}...` : comment

  return (
    <div>
      <p className="text-sm">{displayComment}</p>
      {longText && (
        <Button
          variant="link"
          className="pl-0 text-muted-foreground capitalize"
          onClick={() => setExpandedComment(!expandedComment)}
        >
          {expandedComment ? 'show less' : 'show more'}
        </Button>
      )}
    </div>
  )
}
export default Comment
