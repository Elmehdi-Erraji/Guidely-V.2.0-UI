#!/bin/bash

# Loop over each day in January
for day in {01..31}
do
  # Make 5 commits per day with 1 hour difference
  for i in {0..4}
  do
    hour=$((9 + i)) # Commits from 09:00 to 13:00

    export GIT_AUTHOR_DATE="2025-01-$day $hour:00:00"
    export GIT_COMMITTER_DATE="2025-01-$day $hour:00:00"

    echo "Commit $i for 2025-01-$day at $hour:00" >> january_log.txt
    git add january_log.txt
    git commit -m "feat: commit $i on 2025-01-$day at $hour:00"
  done
done
