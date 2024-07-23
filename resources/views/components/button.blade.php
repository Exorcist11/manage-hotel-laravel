<button type="{{ $type ?? 'button' }}"
    class="border rounded-lg px-3 py-2 cursor-pointer w-fit flex items-center gap-1 hover:bg-slate-100 {{ $class }}">
    @if ($icon)
        <x-dynamic-component :component="$icon" class="h-4 w-4 inline-block" />
    @endif

    <p>{{ $name }}</p>
</button>
