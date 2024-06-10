import os
from transformers import pipeline

model = "facebook/bart-large-mnli"
method = "zero-shot-classification"

def sort_people_by_correlation(people_candidates, text_detection):
    classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli", multi_label=True)

    correlation_scores = {}

    all_candidates = [candidate for person in people_candidates for candidate in person['field']]
    results = classifier(
        text_detection,
        candidate_labels=all_candidates,
    )
    print(results)

    print('Classifying...')
    for person in people_candidates:
        person_results = [results['scores'][all_candidates.index(candidate)] for candidate in person['field']]
        avg_score = sum(person_results) / len(person_results)
        correlation_scores[(person['firstName'], person['lastName'])] = avg_score

    sorted_people = sorted(correlation_scores.items(), key=lambda x: x[1], reverse=True)

    print('Done.')
    return sorted_people